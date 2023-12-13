const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

exports.signup = asyncHandler(async (req, res, next) => {
    // add validator
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ 'message': 'Email and password are required'});

    const users = await User.find({ email: email }).exec();
    if (users.length != 0) 
        return res.status(409).json({ 'message': 'User with email already exists' });
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await new User({
            email,
            password: hashedPassword
        }).save();
        
        return res.status(201).json({ 'message': 'User created'});
    } catch(err) {
        return res.status(500).json({ 'message': err.message });
    }

});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ 'message': 'Email and password are required'});

    const user = await User.findOne({ email }).exec();
    if (!user)
        return res.status(401).json({ 'message': 'Email not found.'});
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
        const accessToken = jwt.sign(
            { 'userId': user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { 'userId': user.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        await User.findByIdAndUpdate(user.id, { refreshToken });

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ accessToken, 'userId': user.id });
    } else {
        res.status(401).json({ 'message': 'Incorrect email or password' });
    }
});

exports.logout = asyncHandler(async (req, res, next) => {
    // delete access token on client
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }
    
    await User.findByIdAndUpdate(user.id, { refreshToken: null });
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
});

exports.handleRefreshToken = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user)
        return res.sendStatus(403);
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.userId)
            return res.sendStatus(403);

        const accessToken = jwt.sign(
            { 'userId': decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        res.json({ accessToken });
    });
});
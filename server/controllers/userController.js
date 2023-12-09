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

        await User.findOneAndUpdate({ email }, { refreshToken });

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ accessToken });
    } else {
        res.status(401).json({ 'message': 'Incorrect email or password' });
    }
});
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

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

    const user = await User.findOne({email: email}).exec();
    if (!user)
        return res.status(401).json({ 'message': 'Email not found.'});
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch)
        res.status(200).json({ 'message': 'Loged in' });
    else
        res.status(401).json({ 'message': 'Incorrect email or password' });
});
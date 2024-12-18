const express = require ('express');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const User = require("../database/models/User");

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body; // avem nev pe email si parola pe care le scoatem din req.body;
//req.body e un obiect  
    const existingUser = await User.findOne({
        where: {
            email
        }
    })

    //daca nu gaseste userul -> ! e negatia
    if (!existingUser) {
        return res.status(400).json({success: false, message: 'User not found', data: {}});
    }
    
    const isValidPassword = bcrypt.compareSync(password, existingUser.dataValues.password); 
    //comparam stringul pe care l-am prim in request (password) cu parola pe care noi
    //avem in baza de date (existingUser.dataValues.password)

    if (!isValidPassword) {
        return res.status(400).json({success: false, message: 'Not the same password', data: {}});
    }

    const token = jwt.sign({id: existingUser.dataValues.id}, process.env.TOKEN_SECRET, {
        expiresIn: '1h'
    })

    res.status(200).json({success: true, message: 'Valid email and password', data: token})
})

module.exports = router;
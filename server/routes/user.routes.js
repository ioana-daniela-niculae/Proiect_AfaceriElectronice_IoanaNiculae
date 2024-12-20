const express = require ('express');
const bcrypt = require ('bcrypt');
const User = require("../database/models/User");


const router = express.Router();

//METODE CRUD

//metoda de getAll
router.get('/', async (req, res) => {
    //console.log(req.userId) - afiseaza in consola id-ul utilizatorului si returneaza toate datele pe baza id-ului
    const users = await User.findAll({
        attributes:{
            exclude: ['password']
        }
    });
    //exclude parola ca sa nu mai fie vizibila tuturor
    res.status(200).json(users);
    
    })

//metoda de findOne
    router.get('/:id', async (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({success: false, message: 'User id is not valid', data: {}})
    }

    const user = await User.findByPk(id,{
        attributes: {
            exclude: ['password']
        }
    });



if (!user){
        return res.status(400).json({success: false, message: 'User not found', data: {}})
    }
    res.status(200).json({success: true, message: 'User was found', data: user})
})

//verif daca mai exista un utilizator cu acelasi email
//metoda de POST
router.post('/', async (req, res) => {
    const existingUser = await User.findOne({
        where:{
            email: req.body.email
        }
    })
if(existingUser)  {
    return res.status(400).json({success: false, message: 'User already exists', data: {}});
}


const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(req.body.password, salt); //hasurarea parolei ca sa nu fie vizibila tuturor

const user = await User.create({
    ...req.body, //preia tot din req body
    password: hashedPassword
   //email: req.body.email,
   //role: req.body.role,
})

delete user.dataValues.password;

res.status(201).json({success: true, message: 'User created', data: user});
})


//metoda de put - de update
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({success: false, message: 'User id is not valid', data: {}})
    }
    
    const user = await User.findByPk(id);


    if (!user){
        return res.status(400).json({success: false, message: 'User not found', data: {}})
    }

    const updatedUser = await user.update({
        ...req.body //vrem sa facem update utilizatorului cu tot ce primim in requestul body-ului

    })

    delete updatedUser.dataValues.password;

    res.status(200).json({success:true, message: 'User updated', data: updatedUser})

})


//metoda de delete
router.delete('/:id', async (req,res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({success: false, message: 'User id is not valid', data: {}})
    }
    
    const user = await User.findByPk(id);


    if (!user){
        return res.status(400).json({success: false, message: 'User not found', data: {}})
    }

    await user.destroy();

    res.status(200).json({success:true, message: 'User successfully deleted', data: {}})


})

module.exports = router;
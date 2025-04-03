const router = require('express').Router()
const User = require('../modules/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Inscription
router.post('/signin', async(req, res)=>{
    try {
        const {username, email, password} = req.body
        const existingUsername = await User.findOne({username})
        const existingEmail= await User.findOne({email})

        if(existingUsername){
            return res.status(400).json({message : "Le nom d'utilisateur existe déjà"})
        }

        if(username.lenght<4){
            return res.status(400).json({message : "Le nom d'utilisateur doit avoir au moin 4 caractères"})
        }

        if(existingEmail){
            return res.status(400).json({message : "L'email existe déjà"})
        }

        const hashpass = await bcrypt.hash(password, 10)

        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashpass
        })

        await newUser.save()
        return res.status(200).json({message : "Utilisateur ajouté avec succées"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Erreur au niveau du serveur"})
    }

})

router.post('/login', async(req, res)=>{
    try {
        const {username, password} = req.body;
        const existingUsername = await User.findOne({username})
        if(!existingUsername){
            return res.status(400).json({message : "Cordonnées Incorrectes"})
        }
        bcrypt.compare(password,existingUsername.password, (err, data)=>{
            if(data){
                const authClaims = [{name : username}, {jti : jwt.sign({}, 'TM')}]
                const token = jwt.sign({authClaims}, 'TM', {expiresIn : "2d"})
                return res.status(200).json({id : existingUsername._id, token : token})
            }else{
                return res.status(400).json({message : "Cordonnées Incorrectes"})
            }
        })
    } catch (error) {
        return res.status(400).json({message: "Erreur au niveau du serveur"})
    }
})

module.exports = router
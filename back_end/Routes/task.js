const router = require('express').Router()
const Task = require('../modules/tasks')
const User = require('../modules/user')
const authToken = require('./auth')

router.post('/create-task',authToken, async(req, res)=>{
    try {
        const {title, desc} = req.body
        const {id} = req.headers
    
        const newTask = new Task({
            title : title,
            desc : desc
        })
    
        const savedTask = await newTask.save()
        const taskId = savedTask._id
        await User.findByIdAndUpdate(id, {$push:{tasks : taskId}})
        return res.status(200).json({message : "Tâche ajoutée"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Erreur au niveau du serveur"})
        
    }
})

router.get('/get-all-tasks', authToken, async(req, res)=>{
    try {
        const {id} = req.headers
        const userData = await User.findById(id).populate({path:'tasks', options : {sort:{createdAt : -1}}})
        return res.status(200).json({data : userData})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Erreur au niveau du serveur"})
    }
})

router.delete('/delete-task/:id', authToken, async(req, res)=>{
    try {
        const {id} = req.params
        const userId = req.headers.id
        await Task.findByIdAndDelete(id)
        await User.findByIdAndUpdate(userId, {$pull:{tasks : id}})
        return res.status(200).json({message : "Tâche Suprrimée"})
    } catch (error) {
        return res.status(400).json({message : "Erreur au niveau du serveur"})
    }
})

router.put('/update-tasks/:id', authToken, async(req, res)=>{
    try {
        const {id} = req.params
        const {title, desc} = req.body
        await Task.findOneAndUpdate( { _id: id }, {title : title, desc : desc})
        return res.status(200).json({message : "Task Modifiée"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Erreur au niveau du serveur"})
    }
})

router.put('/update-important/:id',authToken, async(req, res)=>{
    try {
        const {id} = req.params
        const taskData = await Task.findById(id)
        const impTask = taskData.important
        await Task.findByIdAndUpdate(id, {important : !impTask})
        return res.status(200).json({message : "Tâche Modifiée"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Erreur au niveau du serveur"})
    }
})
router.put('/update-complete/:id',authToken, async(req, res)=>{
    try {
        const {id} = req.params
        const taskData = await Task.findById(id)
        const completeTask = taskData.complete
        await Task.findByIdAndUpdate(id, {complete : !completeTask})
        return res.status(200).json({message : "Tâche Modifiée"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Erreur au niveau du serveur"})
    }
})

router.get('/get-complete-task', authToken, async(req, res)=>{
    try {
        const {id} = req.headers
        const userData = await User.findById(id).populate({path:'tasks', 
            match : {complete : true}, 
            options:{sort : {createdAt : -1}}
        })
        const taskData = userData.tasks
        return res.status(200).json({data : taskData})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Erreur au niveau du serveur"})
    }
})

router.get('/get-incomplete-task', authToken, async(req, res)=>{
    try {
        const {id} = req.headers
        const userData = await User.findById(id).populate({path:'tasks', 
            match : {complete : false}, 
            options:{sort : {createdAt : -1}}
        })
        const taskData = userData.tasks
        return res.status(200).json({data : taskData})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Erreur au niveau du serveur"})
    }
})

router.get('/get-important-task', authToken, async(req, res)=>{
    try {
        const {id} = req.headers
        const userData = await User.findById(id).populate({path:'tasks', 
            match : {important : true}, 
            options:{sort : {createdAt : -1}}
        })
        const taskData = userData.tasks
        return res.status(200).json({data : taskData})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "Erreur au niveau du serveur"})
    }
})

module.exports = router
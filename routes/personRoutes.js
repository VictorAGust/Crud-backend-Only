const router = require('express').Router()

const Person = require('../models/Person')

//CREATE
router.post('/', async (req, res) => {

    const { name, salary, approved } = req.body

    if(!name) {
        res.status(422).json({ error: 'o nome é obrigatorio!' })
    }
    
    const person = {
        name,
        salary,
        approved,
    }
    
    try {
    
        await Person.create(person)
    
        res.status(201).json( { message: 'Pessoa inserida no sistema com sucesso' } )
        
    } catch (error) {
        res.status(500).json({error: error})
    }
 })
 
//READ
router.get('/', async (req, res) => {

    try {

     const people = await Person.find()
     
     res.status(200).json(people) 
    } catch (error) {
        res.status(500).json( { error: error } )
    }

})

router.get('/:id', async (req, res) =>{

    const id = req.params.id

    try {

        const person = await Person.findOne({ _id: id })

        if(!person) {
            res.status(422).json({ message: 'o usuario nao foi encontrado!' })
            return
        }
        
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json( { error: error } )
    }

})

//UPDATE
router.patch('/:id', async (req, res) => {
    const id = req.params.id

     const { name, salary, approved } = req.body

 const person = {
     name,
     salary,
     approved,
 }


try {

    const updatePerson = await Person.updateOne({_id: id}, person)


    res.status(200).json(person)

    
} catch (error) {
    res.status(500).json( { error: error } )
}

})

//DELETE

router.delete('/:id', async (req, res) => {

const id = req.params.id

const person = await Person.findOne({ _id: id })

    if(!person) {
         res.status(422).json({ message: 'o usuario nao foi encontrado!' })
         return
    }
    try {

    await Person.deleteOne({ _id: id })         

    res.status(200).json({ message: 'usuario removido com sucesso!' })    
    
    } catch (error) {
        res.status(500).json({ error: error })
    }
})


 module.exports = router
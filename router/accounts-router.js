const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
        .then(acc => {
            res.status(200).json(acc)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error retrieving the account data.',
                err
            })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where('id', id)
        .first()
        .then(acc => res.status(200).json({ data: acc }))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const accData = req.body;
    db('accounts')
        .insert(accData)
        .then(acc => res.status(201).json(acc))
        .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db('accounts')
        .where('id', id)
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ data: count })
            } else {
                res.status(404).json({
                    message: 'Account not found!'
                })
            }
        })
        .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where('id', id)
        .delete()
        .then(count => {
            if (count > 0) {
                res.status(200).json({ data: count })
            } else {
                res.status(404).json({
                    message: 'Account not found!'
                })
            }
        })
        .catch(err => console.log(err))
})

router.use((error, req, res, next) => {
    res.status(400).json({
        message: 'there was an error',
        error
    })
})

module.exports = router;
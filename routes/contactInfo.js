const express = require('express');
const router = express.Router();
const ContactInfo = require('../models/contactInfo');

router.get('/', async (req, res) => {
    try {
        const contactInfo = await ContactInfo.find();
        res.json(contactInfo);
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const contactInfo = await ContactInfo.findById(req.params.id);
        if (!contactInfo) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json(contactInfo);
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err });
    }
});

router.post('/', async (req, res) => {
    const contactInfo = new ContactInfo({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        address: req.body.address
    });

    try {
        const c1 = await contactInfo.save();
        res.status(201).json(c1);
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const contactInfo = await ContactInfo.findById(req.params.id);
        if (!contactInfo) {
            return res.status(404).json({ message: 'Record not found' });
        }

        Object.keys(req.body).forEach((key) => {
            contactInfo[key] = req.body[key];
        });

        const updatedDocument = await contactInfo.save();
        res.json(updatedDocument);
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const contactInfoDelete = await ContactInfo.findByIdAndDelete(req.params.id);
        if (!contactInfoDelete) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (err) {
        console.error('Error deleting record:', err);
        res.status(500).json({ message: 'Error', error: err.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        const result = await ContactInfo.deleteMany({});
        res.json({ message: `${result.deletedCount} records deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err });
    }
});


module.exports = router;
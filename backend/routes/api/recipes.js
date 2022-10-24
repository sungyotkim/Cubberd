const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe')

router.post('/', async (req, res, next) => {
    const recipe = new Recipe( {
        uri: req.body.uri,
        label: req.body.label,
        image: req.body.image,
        source: req.body.source,
        url: req.body.url,
        source: req.body.source,
        url: req.body.url,
        dietLabels: req.body.dietLabels,
        label: req.body.label,
        label: req.body.label,
        label: req.body.label,
        label: req.body.label,
    })
})
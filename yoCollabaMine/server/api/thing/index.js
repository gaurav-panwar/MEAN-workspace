'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/', controller.index);//called on $onInit from main.component.js
router.get('/:id', controller.show);
router.post('/', controller.create);//Called by addThing() from main.component.js
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);//deleteThing()

module.exports = router;

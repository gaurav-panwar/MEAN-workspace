'use strict';

var express = require('express');
var controller = require('./organisation.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/findOrg', controller.findOrg);
router.post('/updateTeam', controller.updateTeam);
router.post('/addUser', controller.addUser);
router.post('/findOrgbyName', controller.findOrgbyName);
router.post('/findOrgbyNamePartial', controller.findOrgbyNamePartial);


router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

//router.put('/:id/accept', controller.upsert);

module.exports = router;

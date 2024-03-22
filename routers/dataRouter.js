const express = require('express');
const dataRouter = express.Router();
const dataController = require('../controllers/dataController.js');

dataRouter.get('/', dataController.getAllData);


dataRouter.get('/add', dataController.addDataGet);
dataRouter.post('/add', dataController.addDataPost);

dataRouter.get('/update', dataController.updateDataGet);
dataRouter.post('/update', dataController.updateDataPost);

dataRouter.post('/delete', dataController.deleteData);


module.exports = dataRouter;
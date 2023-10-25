const express = require('express')
const route = express.Router()
const services = require('../services/render')
const controller = require('../controller/controller')

  
route.get('/', services.homeRoutes)
route.get('/addUser', services.add_user)
route.get('/updateUser', services.update_user)
route.get('/deleteUser', services.delete_user)


route.post('/api/users', controller.create)
route.get('/api/users', controller.find)
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)
route.post('/api/search', controller.search)

route.get('/:error', services.error);
module.exports = route
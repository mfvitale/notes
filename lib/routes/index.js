'use strict'

const Joi = require('joi')

const buildRoutes = require('./data')

exports.register = function (server, options, next) {
  server.dependency('hapi-mongodb')

  const db = server.plugins['hapi-mongodb'].db
  const ObjectID = server.plugins['hapi-mongodb'].ObjectID
  const notes = buildRoutes(db)

  server.route({
    method: 'GET',
    path: '/notes',
    handler: function handleNotes (request, reply) {
      return notes.list(reply)
    },
    config: {
      auth: {
        strategy: 'session'
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/notes',
    config: {
      validate: {
        payload: {
          title: Joi.string().min(3).required(),
          content: Joi.string().min(3).required()
        }
      }
    },
    handler: function addNote (request, reply) {
      notes.put(request.payload, function wrap (err, result) {
        if (err) { return reply(err) }

        reply(result).code(201)
      })
    },
    config: {
      auth: {
        strategy: 'session'
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/notes/{id}',
    handler: function handleNote (request, reply) {
      return notes.getById(new ObjectID(request.params.id), reply)
    },
    config: {
      auth: {
        strategy: 'session'
      }
    }
  })

  next()
}

exports.register.attributes = {
  name: 'notes',
  version: '0.0.1'
}

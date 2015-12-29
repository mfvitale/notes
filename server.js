'use strict'

const minimist = require('minimist')
const Hapi = require('hapi')

function build (opts, cb) {
  const server = new Hapi.Server()

  cb = cb || noop

  server.connection({ port: opts.port })
  console.log(opts.url);
  server.register([{
    register: require('hapi-mongodb'),
    options: {
      url: opts.mongoURL
    }
  }, require('./lib/routes')], (err) => {
    cb(err, server)
  })

  return server
}

function noop (err) {
  if (err) {
    throw err
  }
}

module.exports = build

function start (opts, cb) {
  build(opts, (err, server) => {
    if (err) return cb(err)

    server.start((err) => {
      cb(err, server)
    })
  })
}

module.exports.start = start

if (require.main === module) {
  start(minimist(process.argv.slice(2), {
    integer: ['port'],
    string: ['mongoURL'],
    alias: {
      port: 'p',
      mongoURL: 'db'
    },
    default: {
      port: 3000,
      mongoURL: "mongodb://localhost:27017/local"
    }
  }), (err, server) => {
    if (err) {
      throw err
    }

    console.log('Server running at:', server.info.uri)
  })
}

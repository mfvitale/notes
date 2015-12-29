'use strict'

module.exports = function build (db) {
  const collection = db.collection('notes')

  return {
    put: put,
    getById: getById,
    list: list
  }

  function put (toStore, callback) {
    collection.insert(toStore, function wrap (err, result) {
      if (err) { return callback(err) }

      callback(null, result.ops[0])
    })
  }

  function getById (id, callback) {
    collection.findOne({ _id: id }, callback)
  }

  function list (callback) {
    collection.find().toArray(function wrap (err, result) {
      if (err) { return callback(err) }

      callback(null, result)
    })
  }
}

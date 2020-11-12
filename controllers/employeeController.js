var Employee = require('../models/employee')

var employeeController = {
  find: () => {
    return Employee.find()
  },

  findByID: (id) => {
    return Employee.findOne({'_id': id})
  },

  create: (employeeNew) => {
    return Employee.create(employeeNew)
  },

  update: (id, employeeNew) => {
    return Employee.updateOne({
      '_id': id
    }, {
        $set: employeeNew
    })
  },

  delete: (id) => {
    return Employee.deleteOne({
      '_id': id
    })
  }
}
module.exports = employeeController
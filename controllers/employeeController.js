var Employee = require('../models/employees')

var employeeController = {
  find: () => {
    return Employee.find()
  },

  findByID: (id) => {
    return Employee.findOne({'_id': id})
  },

  create: (firstname, lastname, birthday, email) => {
    let employee = new Employee({
        firstname: firstname,
        lastname: lastname,
        birthday: birthday,
        email: email,
    });
    return Employee.create(employee)
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
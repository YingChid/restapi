const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema(
{
    firstname: String,
    lastname: String,
    birthday: String,
    email: String,
}, {
    timestamps: true
})

const Empoloyee = mongoose.model('employees', employeeSchema)

module.exports = Empoloyee
const user = require("../model/user");
const Consultant = require("../model/consultant");
const Prescription = require("../model/prescription");

function getAllUser(page, limit) {
  return user
    .find()
    .skip((page - 1) * limit)
    .limit(limit);
}

function getOneUser(data) {
  return user.findOne(data);
}

function createUser(userData) {
  return user.create(userData);
}

function updateUser(filter, update, options = {}) {
  return user.findOneAndUpdate(filter, update, options);
}

function getAllConsultant(page, limit) {
  return Consultant.find()
    .skip((page - 1) * limit)
    .limit(limit);
}

function getOneConsultant(data) {
  return Consultant.findOne(data);
}

function createConsultant(userData) {
  return Consultant.create(userData);
}

function getAllPrescription(page, limit) {
  return Prescription.find()
    .skip((page - 1) * limit)
    .limit(limit);
}

function getOnePrescription(data) {
  return Prescription.findOne(data);
}

function createPrescription(userData) {
  return Prescription.create(userData);
}

function updatePrescription(filter, update, options = {}) {
  return Prescription.findOneAndUpdate(filter, update, options);
}

module.exports = {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  getAllConsultant,
  getOneConsultant,
  createConsultant,
  getAllPrescription,
  getOnePrescription,
  createPrescription,
  updatePrescription,
};

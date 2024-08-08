const user = require("../model/user");
const Consultant = require("../model/consultant");
const Prescription = require("../model/prescription");

function getAllUser(filter, page, limit) {
  return user
    .find(filter)
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

function getAllConsultant(filter, page, limit) {
  return Consultant.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
}

function getOneConsultant(data) {
  return Consultant.findOne(data);
}

function createConsultant(data) {
  return Consultant.create(data);
}

function getAllPrescription(filter, page, limit) {
  return Prescription.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
}

function getOnePrescription(data) {
  return Prescription.findById(data);
}

function createPrescription(data) {
  return Prescription.create(data);
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

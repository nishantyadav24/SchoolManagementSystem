
const db = require('../db');

// Add a new school
const addSchool = async ({ name, address, latitude, longitude }) => {
  const [result] = await db.execute(
    `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
    [name, address, latitude, longitude]
  );
  return result.insertId;
};

// Get all schools from DB
const getAllSchools = async () => {
  const [rows] = await db.query(`SELECT * FROM schools`);
  return rows;
};

module.exports = {
  addSchool,
  getAllSchools
};

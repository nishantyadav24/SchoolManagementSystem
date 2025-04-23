const db = require('../Config/db.js');

const addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  });
};

const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const userLat = parseFloat(latitude);
  const userLong = parseFloat(longitude);

  const query = 'SELECT * FROM schools';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    // Calculate distance using Haversine formula
    const sortedSchools = results.map(school => {
      const latDiff = school.latitude - userLat;
      const longDiff = school.longitude - userLong;
      const distance = Math.sqrt(latDiff * latDiff + longDiff * longDiff); // Simplified Euclidean distance
      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  });
};

module.exports = { addSchool, listSchools };
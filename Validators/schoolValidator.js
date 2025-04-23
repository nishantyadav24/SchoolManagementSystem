const validateAddSchool = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }

  if (!address || typeof address !== 'string' || address.trim() === '') {
    return res.status(400).json({ error: 'Address is required and must be a non-empty string' });
  }

  if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
    return res.status(400).json({ error: 'Latitude must be a number between -90 and 90' });
  }

  if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
    return res.status(400).json({ error: 'Longitude must be a number between -180 and 180' });
  }

  next();
};

const validateListSchools = (req, res, next) => {
  const { latitude, longitude } = req.query;

  if (!latitude || isNaN(latitude) || parseFloat(latitude) < -90 || parseFloat(latitude) > 90) {
    return res.status(400).json({ error: 'Latitude must be a number between -90 and 90' });
  }

  if (!longitude || isNaN(longitude) || parseFloat(longitude) < -180 || parseFloat(longitude) > 180) {
    return res.status(400).json({ error: 'Longitude must be a number between -180 and 180' });
  }

  next();
};

module.exports = { validateAddSchool, validateListSchools };
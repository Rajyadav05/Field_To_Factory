const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const JWT_SECRET = 'maharashtra_biomass_secret_key';
const DATA_FILE = path.join(__dirname, 'data.json');

// Utility to read/write DB
const readDB = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ---------------------------------------------------------------------------
// AUTHENTICATION ROUTES
// ---------------------------------------------------------------------------

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, phone, password, role, district } = req.body;
    const db = readDB();

    if (db.users.find(u => u.phone === phone)) {
      return res.status(400).json({ error: 'User already exists with this phone number' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: `u${Date.now()}`,
      name,
      phone,
      password: hashedPassword,
      role, // 'farmer', 'industry', 'admin'
      district,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    writeDB(db);

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ token, user: { id: newUser.id, name, role, district } });
  } catch (err) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const db = readDB();

    const user = db.users.find(u => u.phone === phone);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, district: user.district } });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user: { id: user.id, name: user.name, role: user.role, district: user.district } });
});

// ---------------------------------------------------------------------------
// DATA ROUTES
// ---------------------------------------------------------------------------

// Get Industry Dashboard Map Data
app.get('/api/industry/map-data', (req, res) => {
  const db = readDB();
  res.json({
    biomassListings: db.biomassListings,
    industryNodes: db.industryNodes,
    riskZones: db.riskZones,
    polygons: db.polygons
  });
});

// Get Listings
app.get('/api/biomass', (req, res) => {
  const db = readDB();
  res.json(db.biomassListings);
});

// Add Listing (Farmer)
app.post('/api/biomass', authenticateToken, (req, res) => {
  if (req.user.role !== 'farmer') return res.status(403).json({ error: 'Only farmers can add listings' });
  
  const { crop, qty, mst, price, loc, pos } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.id === req.user.id);

  const newListing = {
    id: `b${Date.now()}`,
    farmerId: user.id,
    name: user.name + ' Farm',
    loc: loc || `${user.district || 'Maharashtra'} • Just added`,
    crop,
    risk: 'UNKNOWN', // Pending AI calculation
    qty,
    mst: mst || 'N/A',
    ndvi: 'Pending',
    ndti: 'Pending',
    price,
    conf: 'Pending',
    pos: pos || [19.75, 75.71] // Default center MAHARASHTRA
  };

  db.biomassListings.unshift(newListing);
  writeDB(db);
  res.status(201).json(newListing);
});

// Reserve Listing (Industry)
app.post('/api/biomass/:id/reserve', authenticateToken, (req, res) => {
  if (req.user.role !== 'industry') return res.status(403).json({ error: 'Only industries can reserve biomass' });
  
  const db = readDB();
  const listingIndex = db.biomassListings.findIndex(b => b.id === req.params.id);
  
  if (listingIndex === -1) return res.status(404).json({ error: 'Listing not found' });
  
  // For demo, just remove it from available listings
  const reserved = db.biomassListings.splice(listingIndex, 1)[0];
  
  // Optionally save to a reservations array
  if (!db.reservations) db.reservations = [];
  db.reservations.push({
    ...reserved,
    industryId: req.user.id,
    reservedAt: new Date().toISOString()
  });
  
  writeDB(db);
  res.json({ message: 'Reserved successfully', reserved });
});

app.listen(PORT, () => {
  console.log(`Maharashtra Biomass API running on http://localhost:${PORT}`);
});

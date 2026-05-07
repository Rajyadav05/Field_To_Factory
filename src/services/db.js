const DB_KEY = 'maharashtra_biomass_db';

const defaultData = {
  users: [
    {
      id: 'u1',
      phone: '9876543210',
      password: 'password123', // In a real app this is hashed
      role: 'farmer',
      name: 'Gajanan Patil',
      district: 'Wardha',
      state: 'Maharashtra',
      cropType: 'Cotton',
      totalEarnings: 24600
    },
    {
      id: 'u2',
      phone: '1234567890',
      password: 'password123',
      role: 'industry',
      name: 'Thermax Vidarbha Hub',
      district: 'Nagpur',
      state: 'Maharashtra'
    }
  ],
  listings: [
    { id: 'l1', farmerId: 'u1', farmerName: 'Gajanan Patil', crop: 'Cotton Residue', qty: '8.4', mst: '12%', ndvi: '0.68', conf: '94.2%', loc: 'Wardha, MH', pos: [20.7453, 78.6022], risk: 'HIGH', status: 'available' },
    { id: 'l2', farmerId: 'u3', farmerName: 'Ramesh Kale', crop: 'Sugarcane Trash', qty: '14.2', mst: '18%', ndvi: '0.72', conf: '91.5%', loc: 'Satara, MH', pos: [17.6805, 74.0183], risk: 'LOW', status: 'available' },
    { id: 'l3', farmerId: 'u4', farmerName: 'Suresh Deshmukh', crop: 'Rice Straw', qty: '5.1', mst: '14%', ndvi: '0.55', conf: '88.0%', loc: 'Pune, MH', pos: [18.5204, 73.8567], risk: 'MEDIUM', status: 'available' },
    { id: 'l4', farmerId: 'u5', farmerName: 'Maruti Kadam', crop: 'Cotton Residue', qty: '12.0', mst: '10%', ndvi: '0.61', conf: '96.1%', loc: 'Nagpur, MH', pos: [21.1458, 79.0882], risk: 'HIGH', status: 'available' },
    { id: 'l5', farmerId: 'u6', farmerName: 'Vikas Shinde', crop: 'Sugarcane Trash', qty: '22.5', mst: '20%', ndvi: '0.80', conf: '89.4%', loc: 'Kolhapur, MH', pos: [16.7050, 74.2433], risk: 'LOW', status: 'available' }
  ],
  industryNodes: [
    { id: 'i1', name: 'Pune Processing Hub', pos: [18.6, 73.9] },
    { id: 'i2', name: 'Nagpur Energy Center', pos: [21.2, 79.1] },
    { id: 'i3', name: 'Nashik BioFuels', pos: [20.0, 73.8] }
  ],
  riskZones: [
    { id: 'r1', pos: [20.7, 78.6] }, // Near Wardha
    { id: 'r2', pos: [21.1, 79.2] }  // Near Nagpur
  ]
};

export const initDB = () => {
  const existing = localStorage.getItem(DB_KEY);
  if (!existing) {
    localStorage.setItem(DB_KEY, JSON.stringify(defaultData));
  }
};

export const getDB = () => {
  initDB();
  return JSON.parse(localStorage.getItem(DB_KEY));
};

export const setDB = (data) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};

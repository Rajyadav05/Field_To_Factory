import { getDB, setDB } from './db';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const farmerService = {
  getMyListings: async (farmerId) => {
    await delay(500);
    const db = getDB();
    return db.listings.filter(l => l.farmerId === farmerId);
  },

  createListing: async (listingData) => {
    await delay(1200); // Slower to simulate AI processing
    const db = getDB();
    
    const newListing = {
      id: `l${Date.now()}`,
      ...listingData,
      status: 'available',
      // Simulated AI Confidence parameters
      mst: `${Math.floor(Math.random() * 10 + 10)}%`,
      ndvi: (Math.random() * 0.3 + 0.5).toFixed(2),
      conf: `${(Math.random() * 5 + 90).toFixed(1)}%`,
      risk: Math.random() > 0.7 ? 'HIGH' : 'LOW'
    };
    
    db.listings.push(newListing);
    setDB(db);
    
    return newListing;
  }
};

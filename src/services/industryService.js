import { getDB } from './db';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const industryService = {
  getMapData: async () => {
    await delay(600);
    const db = getDB();
    return {
      biomassListings: db.listings.filter(l => l.status === 'available'),
      industryNodes: db.industryNodes,
      riskZones: db.riskZones,
      polygons: [
        // Wardha approximate hotspot polygon
        [
          [20.7, 78.5],
          [20.8, 78.6],
          [20.75, 78.7],
          [20.65, 78.6]
        ]
      ]
    };
  }
};

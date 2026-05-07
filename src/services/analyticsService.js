import { getDB } from './db';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const analyticsService = {
  getImpactData: async () => {
    await delay(500);
    const db = getDB();
    
    // Simulate dynamic aggregation from DB
    const activeContracts = db.listings.filter(l => l.status === 'booked').length;
    const availableListings = db.listings.filter(l => l.status === 'available');
    
    const totalQty = availableListings.reduce((sum, l) => sum + parseFloat(l.qty), 0);
    const totalEarnings = db.users.filter(u => u.role === 'farmer').reduce((sum, u) => sum + (u.totalEarnings || 0), 0);
    
    return {
      kpis: {
        co2Mitigated: 3.2, // Millions KG
        biomassRecovered: totalQty * 1000, // Tons
        farmerEarnings: totalEarnings / 10000000, // Cr
        activeContracts: activeContracts + 842, // Add baseline
        carbonCredits: 1205
      },
      forecast: [
        { month: 'Jun', value: 120 }, { month: 'Jul', value: 210 }, { month: 'Aug', value: 380 },
        { month: 'Sep', value: 450 }, { month: 'Oct', value: 890 }, { month: 'Nov', value: 1220 },
        { month: 'Dec', value: 910 }
      ],
      crops: [
        { name: 'Cotton Residue', value: 42, color: '#00E5FF' },
        { name: 'Sugarcane Trash', value: 38, color: '#1DB97A' },
        { name: 'Rice Straw', value: 15, color: '#2F80ED' },
        { name: 'Other', value: 5, color: '#A0A0A0' }
      ],
      districts: [
        { name: 'Pune', value: 140 },
        { name: 'Nagpur', value: 115 },
        { name: 'Nashik', value: 85 },
        { name: 'Wardha', value: 65 },
        { name: 'Kolhapur', value: 50 },
        { name: 'Satara', value: 45 }
      ],
      transactions: [
        { id: 1, name: 'Vidarbha Bio-Hub', crop: 'Cotton', qty: '8.4 T', price: '₹26,880', time: '2 min ago' },
        { id: 2, name: 'Pune Sugar Mills', crop: 'Sugarcane', qty: '14.2 T', price: '₹42,600', time: '14 min ago' },
        { id: 3, name: 'Nagpur Energy Ltd', crop: 'Cotton', qty: '12.0 T', price: '₹33,600', time: '41 min ago' }
      ]
    };
  }
};

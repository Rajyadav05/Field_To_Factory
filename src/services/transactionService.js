const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const transactionService = {
  executeTransaction: async (listingData, buyerData) => {
    // Simulate network and processing
    await delay(2000);
    
    // Simulate 5% failure rate for realism
    if (Math.random() < 0.05) {
      throw new Error("Bank authorization failed. Please retry.");
    }

    const transactionId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const invoiceId = 'INV-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    
    const transaction = {
      id: transactionId,
      invoiceId,
      listingId: listingData.id,
      buyerId: buyerData.id,
      buyerName: buyerData.name,
      farmerId: listingData.farmerId,
      farmerName: listingData.farmerName,
      crop: listingData.crop,
      qty: listingData.qty,
      pricePerTon: 3400, // Hardcoded standard for simulation
      totalValue: parseFloat(listingData.qty) * 3400,
      timestamp: new Date().toISOString(),
      status: 'COMPLETED',
      logisticsAssigned: true,
      carbonOffsetEst: parseFloat(listingData.qty) * 1.8 // 1.8 tons CO2 per ton of biomass
    };

    // Persist to localStorage
    const dbRaw = localStorage.getItem('maharashtra_biomass_db');
    if (dbRaw) {
      const db = JSON.parse(dbRaw);
      if (!db.transactions) db.transactions = [];
      db.transactions.push(transaction);
      
      // Update listing status
      const listingIndex = db.listings.findIndex(l => l.id === listingData.id);
      if (listingIndex !== -1) {
        db.listings[listingIndex].status = 'booked';
      }
      
      localStorage.setItem('maharashtra_biomass_db', JSON.stringify(db));
    }

    return transaction;
  },

  getTransactionHistory: async () => {
    await delay(500);
    const dbRaw = localStorage.getItem('maharashtra_biomass_db');
    if (dbRaw) {
      const db = JSON.parse(dbRaw);
      return db.transactions || [];
    }
    return [];
  }
};

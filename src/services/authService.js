import { getDB, setDB } from './db';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (phone, password) => {
    await delay(800); // Simulate network latency
    const db = getDB();
    const user = db.users.find(u => u.phone === phone && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Simulate JWT token
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;
    return { user, token };
  },

  register: async (userData) => {
    await delay(1000);
    const db = getDB();
    
    if (db.users.find(u => u.phone === userData.phone)) {
      throw new Error('Phone number already registered');
    }
    
    const newUser = {
      id: `u${Date.now()}`,
      ...userData,
      totalEarnings: 0
    };
    
    db.users.push(newUser);
    setDB(db);
    
    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`;
    return { user: newUser, token };
  },

  getMe: async (token) => {
    await delay(300);
    const db = getDB();
    // In a real app we'd decode the JWT. Here we parse the mock token ID.
    const parts = token.split('-');
    const userId = parts[3];
    const user = db.users.find(u => u.id === userId);
    
    if (!user) throw new Error('Invalid token');
    return { user };
  }
};

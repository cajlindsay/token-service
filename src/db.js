import loki from 'lokijs';

const db = new loki('tokendb');
export const tokensCollection = db.addCollection('tokens');

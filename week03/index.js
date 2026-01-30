// Identification Header
console.log('Davide Silverii');
console.log('Course: CS31103');
console.log('Week 3');

// Runtime Information
console.log('Node version:', process.version);
console.log('Current date/time:', new Date().toString());

// Configuration via Environment Variables
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// A Simple Data Object
const appConfig = {
  port: PORT,
  environment: NODE_ENV,
  startedAt: new Date().toISOString()
};

console.log('App Config:');
console.log(JSON.stringify(appConfig, null, 2));

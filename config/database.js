const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('authentication', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
   timezone: '+05:00'
});
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection();

module.exports = sequelize;

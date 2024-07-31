const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Payment = sequelize.define('Payment', {
    paymentIntentId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
module.exports =  Payment

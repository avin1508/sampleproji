const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Service = require('./Service');

const Order = sequelize.define('Order', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalBill: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

Order.hasMany(Service, { foreignKey: 'orderId', as: 'orderedServices' });
Service.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

module.exports = Order;
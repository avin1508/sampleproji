
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');
const Order = require('./models/Order');
const Service = require('./models/Service');


Order.hasMany(Service, { foreignKey: 'orderId' });
Service.belongsTo(Order, { foreignKey: 'orderId' });

const app = express();

app.use(bodyParser.json());
app.use('/api', orderRoutes);

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

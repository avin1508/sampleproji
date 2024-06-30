const { Order } = require('../models/Order');
const { Service } = require('../models/Service');

exports.createOrder = async (req, res) => {
  const { fullName, phoneNumber, emailAddress, address, date, services } = req.body;

  try {
    const totalBill = services.reduce((acc, service) => acc + (service.priceOfservice * service.countValue), 0);

    const order = await Order.create({
      fullName,
      phoneNumber,
      emailAddress,
      address,
      date,
      totalBill,
      orderedServices: services.map(service => ({
        name: service.name,
        priceOfservice: service.priceOfservice,
        countValue: service.countValue,
      }))
    }, {
      include: [{
        model: Service,
        as: 'orderedServices'
      }]
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({
      where: { id },
      include: [{ model: Service, as: 'orderedServices' }]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};
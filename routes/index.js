const { authRoutes, cusStoreRoutes } = require('./customer');
const {
  storeRoutes,
  categoryRoutes,
  subCategoryRoutes,
  productRoutes
} = require('./admin');
const { dateTimeConvertor } = require('../controllers');

module.exports = (app) => {
  // Customer routes for customers like Android and iOS apps.
  app.use('/api/customer', authRoutes);
  app.use('/api/customer', cusStoreRoutes);

  // Admin routes for Admin like Admin Web Panel.
  app.use('/api/admin', storeRoutes);
  app.use('/api/admin', categoryRoutes);
  app.use('/api/admin', subCategoryRoutes);
  app.use('/api/admin', productRoutes);

  // Utilities routes
  app.use('/datetime/:date', dateTimeConvertor);
};

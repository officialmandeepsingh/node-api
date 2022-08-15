const {
  authRoutes,
  cusStoreRoutes,
  cusCartRoutes,
  cusBillPaymentRoutes,
  cusAddressRoutes,
  cusFavouriteRoutes,
} = require("./customer");

const {
  storeRoutes,
  categoryRoutes,
  subCategoryRoutes,
  productRoutes,
} = require("./admin");
const { dateTimeConvertor, bulkUploadController } = require("../controllers");

module.exports = (app) => {
  // Customer routes for customers like Android and iOS apps.
  app.use("/api/customer", authRoutes);
  app.use("/api/customer", cusStoreRoutes);
  app.use("/api/customer", cusCartRoutes);
  app.use("/api/customer", cusBillPaymentRoutes);
  app.use("/api/customer", cusAddressRoutes);
  app.use("/api/customer", cusFavouriteRoutes);

  // Admin routes for Admin like Admin Web Panel.
  app.use("/api/admin", storeRoutes);
  app.use("/api/admin", categoryRoutes);
  app.use("/api/admin", subCategoryRoutes);
  app.use("/api/admin", productRoutes);
  app.use("/api/admin/file", bulkUploadController);

  // Utilities routes
  app.use("/datetime/:date", dateTimeConvertor);
};

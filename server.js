const { app, db } = require('./app');
const PORT = process.env.PORT || 8000;

// Sync the database, then start the server
db.sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synced successfully.");

    // Start the server after DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use('/api/', userRoutes);
app.use('/api/', userRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

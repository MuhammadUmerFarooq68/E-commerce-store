const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const session = require('express-session');
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');
const loggerMiddleware = require('./middleware/loggerMiddleware');
require('./models/associations');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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

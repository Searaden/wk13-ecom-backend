const express = require('express');
const routes = require('./routes');
const { Sequelize } = require('sequelize');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'mysql'
});

app.use(routes);

sequelize.sync({force:false}).then(() =>{
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
}).catch(error =>{
  console.error('error syncing DB', error)
});

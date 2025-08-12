import { Sequelize } from 'sequelize';

const {
  MYSQL_HOST = 'localhost',
  MYSQL_PORT = '3306',
  MYSQL_DB = 'palmtrade',
  MYSQL_USER = 'root',
  MYSQL_PASSWORD = 'password',
  NODE_ENV = 'development'
} = process.env;

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  dialect: 'mysql',
  logging: NODE_ENV === 'development' ? false : false
});

export default sequelize;
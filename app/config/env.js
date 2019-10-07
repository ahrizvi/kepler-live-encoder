const env = {
  database: 'enigmalive_db',
  username: 'root',
  password: 'Cyber@321',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};
 
module.exports = env;

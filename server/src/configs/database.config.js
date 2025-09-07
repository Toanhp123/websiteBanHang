const chalk = require("chalk");
const { Sequelize } = require("sequelize");

const envConfig = require("../configs/env.config");

function sqlLogger(msg) {
	// chỉ log SELECT, INSERT, UPDATE, DELETE
	if (/SELECT|INSERT|UPDATE|DELETE/i.test(msg)) {
		const time = new Date().toISOString();

		let color = chalk.white;
		if (/SELECT/i.test(msg)) color = chalk.cyan;
		if (/INSERT/i.test(msg)) color = chalk.green;
		if (/UPDATE/i.test(msg)) color = chalk.yellow;
		if (/DELETE/i.test(msg)) color = chalk.red;

		console.log(
			chalk.gray(`[${time}]`),
			chalk.blueBright("[Sequelize SQL]"),
			color(msg)
		);
	}
}

const sequelize = new Sequelize(
	envConfig.DB_NAME,
	envConfig.DB_USER,
	envConfig.DB_PASS,
	{
		host: envConfig.DB_HOST,
		dialect: "mysql",
		logging: sqlLogger,
	}
);

module.exports = sequelize;

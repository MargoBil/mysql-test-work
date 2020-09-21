const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const mysql = require('mysql2');
const cors = require('cors');
const contactsRouter = require('./contacts.routers');
const sgl = require('./helpers/sgl');
const connection = require('./helpers/connection.mysql');

module.exports = class Server {
	constructor() {
		this.server = null;
	}
	async startServer() {
		this.initServer();
		this.initMiddlewares();
		this.initRoutes();
		await this.initDataBase();
		await this.createTable();
		this.startListening();
	}

	initServer() {
		this.server = express();
	}

	initMiddlewares() {
		this.server.use(express.json());
		this.server.use(
			cors({
				origin: 'http://localhost:3300',
			})
		);
		this.server.use(morgan('dev'));
	}

	initRoutes() {
		this.server.use('/api/contacts', contactsRouter);
	}

	startListening() {
		this.server.listen(process.env.PORT, () => {
			console.log('Server started listening on port', process.env.PORT);
		});
	}

	async initDataBase() {
		try {
			await connection.connect(() => {
				console.log('Database connection successful');
			});
		} catch (err) {
			console.log(err);
			process.exit(1);
		}
	}

	createTable() {
		try {
			connection.query(sgl, (err) => {
				if (err) {
					return console.log(err);
				}
				console.log('table created successfully');
			});
		} catch (error) {
			console.log(error);
		}
	}
};

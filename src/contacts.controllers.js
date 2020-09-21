const connection = require('./helpers/connection.mysql');

class ContactsController {
	getContacts(_, res, next) {
		try {
			connection.query('SELECT * FROM contacts', (err, result) => {
				if (err) {
					return console.log(err);
				}
				res.send(result);
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new ContactsController();

const connection = require('./helpers/connection.mysql');

class ContactsController {
  getContacts(_, res, next) {
    connection.query('SELECT * FROM contacts', (err, result) => {
      if (err) {
        return next(err);
      }
      res.send(result);
    });
  }
  postContacts(req, res, next) {
    const contact = Object.values(req.body);
    connection.query(
      'INSERT INTO contacts(name, phone) VALUES(?, ?)',
      contact,
      err => {
        if (err) {
          return next(err);
        }
        res.send('New contact added successfully');
      },
    );
  }

  filterByNameContact(req, res, next) {
    const filter = Object.values(req.body);
    connection.query(
      'SELECT * FROM contacts WHERE name=?',
      filter,
      (err, result) => {
        if (err) {
          return next(err);
        }
        res.send(result);
      },
    );
  }
  updateContactById(req, res, next) {
    const {id} = req.params;
    const params = Object.entries(req.body);
    const updatedContact = [params[0][1], Number(id)];
    connection.query(
      `UPDATE contacts SET ${params[0][0]}=? WHERE id=?`,
      updatedContact,
      (err, result) => {
        if (err) {
          return console.log(err);
        }
        res.send('contact updated successfully');
      },
    );
  }
  deleteContactById(req, res, next) {
    const {id} = req.params;
    connection.query(`DELETE FROM contacts WHERE id=?`, [id], err => {
      if (err) {
        return console.log(err);
      }
      res.send('contact deleted');
    });
  }
}

module.exports = new ContactsController();

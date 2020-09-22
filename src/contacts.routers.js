const {Router} = require('express');
const contactsRouter = Router();
const {
  getContacts,
  postContacts,
  filterByNameContact,
  updateContactById,
  deleteContactById,
} = require('./contacts.controllers');

//get all contacts:
contactsRouter.get('/', getContacts);
// post contact:
contactsRouter.post('/', postContacts);
//filter contact by name:
contactsRouter.get('/filter', filterByNameContact);
//update contact by id:
contactsRouter.patch('/:id', updateContactById);
//delete contact by id:
contactsRouter.delete('/:id', deleteContactById);

module.exports = contactsRouter;

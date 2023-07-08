const { program } = require("commander");
const contactsService = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.table(allContacts);
    case "get":
      const foundContact = await contactsService.getContactById(id);
      return console.log(foundContact);
    case "add":
      const newContact = await contactsService.addContact(name, email, phone);
      return console.log(newContact);
    case "remove":
      const deletedContact = await contactsService.removeContact(id);
      return console.log(deletedContact);
    default:
      console.log("Unknown action");
  }
};

program
  .option("--action <type>")
  .option("--id <type>")
  .option("--name <type>")
  .option("--email <type>")
  .option("--phone <type>");
program.parse();

const options = program.opts();
invokeAction(options);

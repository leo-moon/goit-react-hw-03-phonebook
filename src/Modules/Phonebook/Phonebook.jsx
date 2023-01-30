import { nanoid } from 'nanoid';
import { Component } from 'react';
import styles from './phonebook.module.scss';
import ContactForm from 'Modules/Phonebook/ContactForm/ContactForm';
import FindContact from './FindContact/FindContact';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  addContact = e => {
    e.preventDefault();
    const { name } = this.state;
    if (this.isDublicate(name)) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => {
      const { name, number, contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      return { contacts: [...contacts, newContact], name: '', number: '' };
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  removeContact(id) {
    this.setState(({ contacts }) => {
      const newList = contacts.filter(contact => contact.id !== id);
      return { contacts: [...newList] };
    });
  }

  isDublicate(name) {
    const nameLower = name.toLowerCase();
    const { contacts } = this.state;
    const dublicate = contacts.find(
      contact => contact.name.toLowerCase() === nameLower
    );
    return Boolean(dublicate);
  }

  findContact() {
    const { filter, contacts } = this.state;
    const filterLower = filter.toLowerCase();
    if (!filter) return contacts;
    const contactsFilter = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLower)
    );
    return contactsFilter;
  }

  render() {
    const { addContact, handleChange } = this;
    const { name, number } = this.state;
    const contactFrm = (
      <ContactForm
        addContact={addContact}
        name={name}
        number={number}
        handleChange={handleChange}
      />
    );
    const findContact = <FindContact handleChange={handleChange} />;

    const contacts = this.findContact();
    const elementsLi = contacts.map(({ id, name, number }) => (
      <li className={styles.li} key={id}>
        {name} : {number}
        <button
          onClick={() => this.removeContact(id)}
          className={`${styles.btn} ${styles.deleteBtn}`}
          type="button"
        >
          Delete
        </button>
      </li>
    ));
    return (
      <>
        <h3 className={styles.mainTitle}>Phonebook</h3>
        {contactFrm}

        <h3 className={styles.mainTitle}>Contacts</h3>
        <div className={styles.find}>
          {findContact}

          <ul>{elementsLi}</ul>
        </div>
      </>
    );
  }
}

export default Phonebook;

import { nanoid } from 'nanoid';
import { Component } from 'react';
import styles from './contact-form.module.scss';

class ContactForm extends Component {
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
        <form action="" onSubmit={addContact} className={styles.form}>
          <div className={styles.block}>
            <label className={styles.title}>Name</label>
            <input
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="John Miller"
              type="text"
              className={styles.input}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </div>
          <div className={styles.block}>
            <label className={styles.title}>Number</label>
            <input
              name="number"
              value={number}
              onChange={handleChange}
              placeholder="+012 123-4567"
              type="tel"
              className={styles.input}
            />
          </div>
          <button className={styles.btn} type="submit">
            Add contact
          </button>
        </form>

        <h3 className={styles.mainTitle}>Contacts</h3>
        <div className={styles.form}>
          <div className={styles.block}>
            <label className={styles.title}>Find contacts by name</label>
            <input
              name="filter"
              onChange={handleChange}
              placeholder="Name"
              type="text"
              className={styles.input}
            />
          </div>
          <ul>{elementsLi}</ul>
        </div>
      </>
    );
  }
}

export default ContactForm;

import { nanoid } from 'nanoid';
import { Component } from 'react';
import styles from './phonebook.module.scss';
// import ContactForm from 'Modules/Phonebook/ContactForm/ContactForm';
import ContactFormClass from './ContactForm/ContactFormClass';
import FindContact from './FindContact/FindContact';
import findCntct from '../../components/findCntct';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    // e.preventDefault();
    // const { name } = this.state;
    if (this.isDublicate(name)) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      return { contacts: [...contacts, newContact] };
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

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('phonebookformclass'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts.length !== prevState.contacts.length)
      localStorage.setItem('phonebookformclass', JSON.stringify(contacts));
  }

  render() {
    const contacts = findCntct(this.state.filter, this.state.contacts);
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
    const { addContact, handleChange } = this;
    // const { name, number } = this.state;
    return (
      <>
        <h3 className={styles.mainTitle}>Phonebook Form As Class</h3>
        {/* <ContactForm
          addContact={addContact}
          name={name}
          number={number}
          handleChange={handleChange}
        /> */}
        <ContactFormClass onSubmit={addContact} />
        <h3 className={styles.mainTitle}>Contacts</h3>
        <div className={styles.find}>
          <FindContact handleChange={handleChange} />
          <ul>{elementsLi}</ul>
        </div>
      </>
    );
  }
}

export default Phonebook;

import { Component } from 'react';

import initState from './initSate';
import styles from './contact-form.module.scss';

class ContactFormClass extends Component {
  state = { ...initState };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const result = onSubmit({ ...this.state });
    if (result) {
      this.reset();
    }
  };

  reset() {
    this.setState({ ...initState });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form action="" onSubmit={this.handleSubmit} className={styles.form}>
        <div className={styles.block}>
          <label className={styles.title}>Name</label>
          <input
            name="name"
            value={name}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            placeholder="+012 123-4567"
            className={styles.input}
            type="tel"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactFormClass;

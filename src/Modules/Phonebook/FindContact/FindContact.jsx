import styles from './find-contact.module.scss';

const FindContact = ({ handleChange }) => {
  return (
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
  );
};

export default FindContact;

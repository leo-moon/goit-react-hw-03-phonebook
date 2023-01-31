const findCntct = (filter, contacts) => {
  const filterLower = filter.toLowerCase();

  if (!filter) return contacts;
  const contactsFilter = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterLower)
  );
  return contactsFilter;
};

export default findCntct;

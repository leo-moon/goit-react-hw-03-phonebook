const findCntct = (filter, contacts) => {
  console.log('filter8888', filter);
  const filterLower = filter.toLowerCase();

  if (!filter) return contacts;
  const contactsFilter = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterLower)
  );
  return contactsFilter;
};

export default findCntct;

import css from './App.module.css';

import { useEffect, useState, useRef } from 'react';

import { nanoid } from 'nanoid';
import ContactForm from './contacnform/ContactForm';
import ContactList from './contactlist/ContactList';
import Filter from './filter/Filter';

import { LS_CONTACTS_KEY } from '../constants/localStorageKeys';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const prevContactsLength = useRef(contacts.length);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const onInputChange = (event, fieldName) => {
    setContacts(prevState => ({
      ...prevState,
      [fieldName]: event.target.value,
    }));
  };

  const handleAddContact = (event, name, number) => {
    event.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      alert('Please enter name and telephone number!');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts!`);
      return;
    }

    setContacts([...contacts, newContact]);
  };

  const filterByName = event => {
    setFilter(event.target.value);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    const stringifiedContacts = localStorage.getItem(LS_CONTACTS_KEY);
    const parsedContacts = JSON.parse(stringifiedContacts) || [];

    if (parsedContacts.length > 0) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length !== prevContactsLength.current) {
      const stringifieldContacts = JSON.stringify(contacts);
      localStorage.setItem(LS_CONTACTS_KEY, stringifieldContacts);
    }


    prevContactsLength.current = contacts.length;
  }, [contacts]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Phonebook</h2>

      <ContactForm
        contacts={contacts}
        onInputChange={onInputChange}
        handleAddContact={handleAddContact}
      />

      <h2 className={css.title}>Contacts</h2>

      <Filter filter={filter} filterByName={filterByName} />

      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </div>
  );
}


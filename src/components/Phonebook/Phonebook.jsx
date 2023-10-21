import React from 'react';

import css from './Phonebook.module.css';

import { useEffect, useRef } from 'react';

import { nanoid } from 'nanoid';
import ContactForm from './contacnform/ContactForm';
import ContactList from './contactlist/ContactList';
import Filter from './filter/Filter';

import { useSelector, useDispatch } from 'react-redux';
import {
  addContact,
  deliteContact,
  filtredContact,
  updateFormField,
} from '../../redux/contactSlice';

export default function Phonebook() {
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  const filter = useSelector(state => state.contacts.filter);

  const prevContactsLength = useRef(contacts.length);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const onInputChange = (event, fieldName) => {
    dispatch(
      updateFormField({ fieldName: fieldName, value: event.target.value })
    );
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
    dispatch(addContact(newContact));
  };

  const filterByName = event => {
    dispatch(filtredContact(event.target.value));
  };

  const handleDeleteContact = contactId => {
    dispatch(deliteContact(contactId));
  };

  useEffect(() => {
    prevContactsLength.current = contacts.length;
  }, [contacts]);
  return (
    <div>
      <div className={css.container}>
        <h2 className={css.title}>Phonebook</h2>

        <ContactForm
          contacts={contacts}
          onInputChange={onInputChange}
          handleAddContact={handleAddContact}
        />

        <h2 className={css.title}>Contacts</h2>

        <Filter filter={filter} filterByName={filterByName} />

        <ContactList
          contacts={filteredContacts}
          onDelete={handleDeleteContact}
        />
      </div>
    </div>
  );
}

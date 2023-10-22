import React from 'react';

import css from './Phonebook.module.css';

import ContactForm from './contacnform/ContactForm';
import ContactList from './contactlist/ContactList';
import Filter from './filter/Filter';

export default function Phonebook() {
  return (
    <div>
      <div className={css.container}>
        <h2 className={css.title}>Phonebook</h2>

        <ContactForm />

        <h2 className={css.title}>Contacts</h2>

        <Filter />

        <ContactList />
      </div>
    </div>
  );
}

import React from 'react';

import css from './Contactlist.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { deliteContact } from '../../../redux/contactSlice';


export default function ContactList() {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const handleDeleteContact = contactId => {
    dispatch(deliteContact(contactId));
  };

  return (
    <div>
       <ul>
          {filteredContacts.map(contact => (
            <li key={contact.id} className={css.contactList}>
              {contact.name}: {contact.number}
              <button onClick={() => handleDeleteContact(contact.id)} className={css.btnDelete} type="click">
                Delete
              </button>
            </li>
          ))}
        </ul>
    </div>
  );
}


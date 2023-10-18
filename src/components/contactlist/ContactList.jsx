import React, { Component } from 'react';

import css from './Contactlist.module.css';

export default class ContactList extends Component {
  render() {
    const { contacts, onDelete } = this.props;
    return (
      <div>
        <ul>
          {contacts.map(contact => (
            <li key={contact.id} className={css.contactList}>
              {contact.name}: {contact.number}
              <button onClick={() => onDelete(contact.id)} className={css.btnDelete} type="click">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

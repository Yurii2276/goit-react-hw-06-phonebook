import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';

import { addContact, updateFormField } from '../../../redux/contactSlice';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        dispatch(updateFormField({ fieldName: 'name', value: value }));
        break;
      case 'number':
        setNumber(value);
        dispatch(updateFormField({ fieldName: 'number', value: value }));
        break;
      default:
    }
  };

  const handleSubmit = event => {
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
    setName('');
    setNumber('');
  };

  return (
    <form className={css.contactContainer} onSubmit={handleSubmit}>
      <label htmlFor="" className={css.InputContainer}>
        <span className={css.inputtitle}>Name</span>
        <input
          onChange={handleInputChange}
          name="name"
          value={name}
          className={css.inputFormStyle}
          type="text"
          required
        />
      </label>

      <label htmlFor="" className={css.InputContainer}>
        <span className={css.inputtitle}>Number</span>
        <input
          onChange={handleInputChange}
          name="number"
          value={number}
          className={css.inputFormStyle}
          type="tel"
          required
        />
      </label>

      <button className={css.btnAddContact} type="submit">
        Add contact
      </button>
    </form>
  );
}

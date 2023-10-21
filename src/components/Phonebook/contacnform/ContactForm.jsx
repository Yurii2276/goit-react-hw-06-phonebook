import { useState } from 'react';

import css from './ContactForm.module.css';

export default function ContactForm(props) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = event => {
        const { name, value } = event.target;
        switch (name) {
          case 'name':
            setName(value);
            break;
          case 'number':
            setNumber(value);
            break;
          default:
        }
      };
    
     const handleSubmit = event => {
        event.preventDefault();
        props.handleAddContact(event, name, number);
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


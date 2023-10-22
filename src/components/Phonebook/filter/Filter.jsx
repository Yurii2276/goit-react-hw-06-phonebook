import React from 'react';
import css from './Filter.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { filtredContact } from '../../../redux/contactSlice';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);

  const filterByName = event => {
    dispatch(filtredContact(event.target.value));
  };

  return (
    <div>
      <label htmlFor="" className={css.InputContainer}>
        <span className={css.inputtitle}>Find contacts by name</span>
        <input
          onChange={filterByName}
          name="filter"
          value={filter}
          className={css.filterInput}
          type="text"
          required
        />
      </label>
    </div>
  );
}

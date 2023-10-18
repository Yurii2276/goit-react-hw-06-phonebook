import React, { Component } from 'react';

import css from './Filter.module.css'

export default class Filter extends Component {
  render() {
    const { filter, filterByName} = this.props;
    return (
      <div>
         <label htmlFor="" className={css.InputContainer}>
          <span className={css.inputtitle}>Find contacts by name</span>
          <input
            onChange={filterByName}
            name='filter'
            value={filter}
            className={css.filterInput}
            type='text'
            required
          />
        </label>
      </div>
    );
  }
}

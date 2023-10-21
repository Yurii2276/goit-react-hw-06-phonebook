import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
  form: {
    name: '',
    number: '',
  },
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deliteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      ); 
    },
    filtredContact: (state, action) => {
      state.filter = action.payload;
    },
    updateFormField: (state, action) => {
      const { fieldName, value } = action.payload;
      state.form[fieldName] = value;
    },
  },
});

export const { addContact, deliteContact, filtredContact, updateFormField } = contactSlice.actions;

export default contactSlice.reducer;

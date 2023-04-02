import { useState, useEffect } from "react"
import { nanoid } from 'nanoid'
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import css from './App.module.css'
import initialContacts from './initialContacts.json'


export const App =() =>  {
  
  const [contacts, setContacts] = useState(() => JSON.parse(window.localStorage.getItem('contacts')) ?? [...initialContacts]);
  const [filter, setFilter] = useState('');
  
  const onDelete = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

  const checkContact = newName => contacts.find(({ name }) => name === newName);
  
  const addContactformSubmit = ({ name, number }) => {
   
    if (!checkContact(name)) {
        const contact = {
      id: nanoid(),
      name,
      number,
        };
      setContacts(prevContacts => [contact, ...prevContacts]);
      return;
    }
    else {
       alert(`${name} is already in contacts`);
      return;
    }
   
  };
  
  const changeFilter = e => {
    setFilter(e.currentTarget.value.trim());
  };

  const getFilterName = () => {
    const normalisedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

console.log(contacts);

    return (
      <div className={css.appContainer}>
        <h1>PhoneBook</h1>
        <ContactForm onSubmit={addContactformSubmit}/>
        <h2>Contacts:</h2>
        <Filter filter={changeFilter}/>
        <ContactList
          contacts={getFilterName()}
          onDelete={onDelete}
        />
    </div>
  );
};

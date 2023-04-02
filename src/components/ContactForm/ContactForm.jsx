import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css'


export const ContactForm = ({onSubmit}) => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

    const loginInputName = nanoid();
    const loginInputnumber = nanoid();

    const handleChange = e => {
        const name = e.currentTarget.name;

        switch (name) {
            case 'name':
            setName(e.currentTarget.value);
            break;

            case 'number':
            setNumber(e.currentTarget.value);
            break;
            
            default:
                return;

        }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };


        return (
            <form onSubmit={handleSubmit}>
                <h2 className={css.nameTitle}>Name</h2>
                <input
                    className={css.input}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    id={loginInputName}
                    onChange={handleChange}
                    value={name}
                />
                <h2 className={css.numberTitle}>Number</h2>
                <input
                    className={css.input}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    id={loginInputnumber}
                    onChange={handleChange}
                    value={number}
                />
                <button type='submit' className={css.addButton}>Добавить контакт</button>

            </form>
        )
}
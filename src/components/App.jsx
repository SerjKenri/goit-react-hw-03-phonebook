import React, { Component } from "react";
import { nanoid } from 'nanoid'
import { Section } from "./Section/Section";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import defaultContacts from "./DefaultContacts/defaultContacts";



export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contact')) || defaultContacts;
    this.setState({contacts});
  };

  componentDidUpdate(_, prevState) {
    if(prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  };

  handleSubmit = e => {
    const id = nanoid(5);
    const name = e.name;
    const number = e.number;
    const contactsLists = [...this.state.contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ id, name, number });
    }

    this.setState({ contacts: contactsLists });
  };

  handleDelete = (id) => {
    this.setState(prevState => {
      const newContactList = prevState.contacts.filter((contact) => contact.id !== id);
      return { contacts: newContactList };
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFilter = () => {
    const filterContactsList = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });

    return filterContactsList;
  };
  
render() {
  const { filter} = this.state;


  return (
    <div
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        color: '#010101'
      }}
    >
      <Section title="Phonebook">
        <ContactForm onSubmit={this.handleSubmit}/>
      </Section>

      <Section title="Contacts">
        <Filter filter={filter} onChange={this.handleChange}/>
        <ContactList contacts={this.handleFilter()} onDelete={this.handleDelete}/>
      </Section>
    </div>
  );
};
};

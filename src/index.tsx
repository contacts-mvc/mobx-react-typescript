import {Component} from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import {Router, Route, browserHistory} from 'react-router';

import {ContactList} from './components/ContactList';
import {ContactDetails} from './components/ContactDetails';
import {SearchBox} from './components/SearchBox';
import Contact from './interfaces/Contact';

// TODO: Use import see
declare const require;
const DevTools = require('mobx-react-devtools').default;
const CONTACTS: Array<Contact> = require('../node_modules/contacts-mvc-data/index.json');

export class AppState {
    @observable private _selectedContact: Contact = null;
    @observable contacts: Array<Contact> = [];
    @observable searchQuery: string = '';

    constructor() {
      this.contacts = CONTACTS;
    }

    @computed
    get filteredContacts() {
      if (!this.searchQuery) {
        return this.contacts;
      }

      return this.contacts.filter(contact=> match(contact, this.searchQuery));

      function match(contact:Contact, query: string): boolean {
        return (contact.firstName && contact.firstName.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1) ||
          (contact.lastName && contact.lastName.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1);
      }
    }

    @computed
    get selectedContact(): Contact {
      if (this.filteredContacts.indexOf(this._selectedContact) > -1) {
        return this._selectedContact;
      }
      return this.filteredContacts[0] || null;
    }

    setSelectedContact(contact: Contact) {
      this._selectedContact = contact;
    }
}

const appState =  new AppState();

@observer
class App extends Component<{}, {}> {
    render() {
      return (
        <div className="container">
          <header className="main-header"></header>
          <main>
            <aside>
              <SearchBox appState={appState} />
              <ContactList appState={appState} />
            </aside>
            <ContactDetails selectedContact={appState.selectedContact} />
          </main>
          <footer className="main-footer"></footer>
          <DevTools />
        </div>
       );
     }
};

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App} />
  </Router>,
  document.getElementById('root'));
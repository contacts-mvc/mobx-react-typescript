import {Component} from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';

import {ContactList} from './components/ContactList';
import {ContactDetails} from './components/ContactDetails';
import {SearchBox} from './components/SearchBox';
import Contact from './interfaces/Contact';

import CONTACTS from './contacts.data';

// TODO: Use import see #6, add typings
declare const require;
const DevTools = require('mobx-react-devtools').default;

export class AppState {
    @observable contacts = [];
    @observable searchQuery: string = '';
    @observable selectedContact: any;

    constructor() {
      this.contacts = CONTACTS;
      this.selectedContact = this.contacts[0];
    }

    performSearch(query: string) {
      this.searchQuery = query;

      this.contacts = CONTACTS.filter(contact=> match(contact, query));
      this.selectedContact = this.contacts[0] || null;

      /**
       * @param  {Contact} contact
       * @param  {string} query
       * @returns boolean
       */
      function match(contact:Contact, query: string): boolean {
        return (contact.firstName && contact.firstName.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1) ||
          (contact.lastName && contact.lastName.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1);
      }
    }
}

@observer
class App extends Component<{appState: AppState}, {}> {
    render() {
      const appState = this.props.appState;

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

const appState =  new AppState();
ReactDOM.render(<App appState={appState} />, document.getElementById('root'));
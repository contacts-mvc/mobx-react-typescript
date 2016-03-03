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
    @observable private _selectedContactId: string = null;
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
      return this.filteredContacts.filter(contact=> contact.id === this._selectedContactId)[0] || null;
    }

    @computed
    get selectedContactId(): string {
     return this._selectedContactId;
    }

    setSelectedContactId(id: string) {
      browserHistory.push(id);
      this._selectedContactId = id;
    }
}

export const appState =  new AppState();

@observer
class App extends Component<{children}, {}> {
    render() {
      return (
        <div className="container">
          <header className="main-header"></header>
          <main>
            <aside>
              <SearchBox appState={appState} />
              <ContactList appState={appState} />
            </aside>
            {this.props.children}
          </main>
          <footer className="main-footer"></footer>
          <DevTools />
        </div>
       );
     }
};

@observer
class ContactDetailsWrapper extends Component<{params}, {}> {
  render() {
    return <ContactDetails appState={appState} params={this.props.params}/>
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path=':contactId' component={ContactDetailsWrapper} />
    </Route>
  </Router>,
  document.getElementById('root'));
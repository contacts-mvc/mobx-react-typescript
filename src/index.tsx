import {Component} from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import DevTools from 'mobx-react-devtools';
import * as CONTACTS from 'contacts-mvc-data';

import {ContactList} from './components/ContactList';
import {ContactDetails} from './components/ContactDetails';
import {EditContact} from './components/EditContact';
import {SearchBox} from './components/SearchBox';
import {Empty} from './components/Empty';
import Contact from './interfaces/Contact';
import {ContactClass} from './interfaces/Contact';


export class AppState {
    @observable private _selectedContactId: string = null;
    @observable contacts: Array<Contact> = [];
    @observable searchQuery: string = '';

    constructor() {

      // hacking around TypeScript `export default` behavior
      const _contacts = CONTACTS as any;
      const contacts = _contacts as Contact[];

      this.contacts = contacts;
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

@observer
class EditContactWrapper extends Component<{params}, {}> {
  render() {
    return <EditContact contact={appState.selectedContact} params={this.props.params}/>
  }
}

@observer
class NewContactWrapper extends Component<{params}, {}> {
  render() {
    const contact = new ContactClass();
    return <EditContact contact={contact} isNew={true} params={this.props.params}/>
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Empty} />
      <Route path='new' component={NewContactWrapper} />
      <Route path=':contactId' component={ContactDetailsWrapper} />
      <Route path=':contactId/edit' component={EditContactWrapper} />
    </Route>
  </Router>,
  document.getElementById('root'));
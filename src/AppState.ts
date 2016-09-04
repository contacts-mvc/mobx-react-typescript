import {observable, computed} from 'mobx';
import * as CONTACTS from 'contacts-mvc-data';
import {Contact} from './interfaces';

export class AppState {
    @observable private _selectedContactId: string = null;
    @observable public contacts: Array<Contact> = [];
    @observable public searchQuery: string = '';

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
      if (this.searchQuery) {
        return this.filteredContacts[0];
      }
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

import {observable, computed, action, useStrict} from 'mobx';
import * as CONTACTS from 'contacts-mvc-data';
import {Contact} from './interfaces';

useStrict(true);

export class AppState {
    @observable public selectedContact: Contact = null
    @observable public contacts: Array<Contact> = CONTACTS as any;
    @observable public searchQuery: string = '';

    @computed
    get filteredContacts() {
      if (!this.searchQuery) {
        return this.contacts;
      }

      return this.contacts.filter(contact=> match(contact, this.searchQuery));

      function match(contact: Contact, query: string): boolean {
        return contains(contact.firstName, query) || contains(contact.lastName, query);
      }
      function contains(str: string = '', query: string = ''): boolean {
        return str.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1;
      }
    }

    @action
    selectContact(contact: Contact): void {
      this.selectedContact = contact;
    }

    @action
    search(query: string): void {
      this.searchQuery = query;
    }
}

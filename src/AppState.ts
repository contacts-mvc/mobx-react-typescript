import {observable, computed, action} from 'mobx';
import * as CONTACTS from 'contacts-mvc-data';
import {Contact} from './interfaces';

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
        return (
          contact.firstName && contains(contact.firstName, query) ||
          (contact.lastName && contains(contact.lastName, query))
        );
      }
      function contains(str: string, query: string): boolean {
        return str.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1;
      }
    }

    @action
    selectContact(contact: Contact): void {
      this.selectedContact = contact;
    }
}

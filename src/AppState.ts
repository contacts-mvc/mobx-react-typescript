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
        return (contact.firstName && contact.firstName.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1) ||
          (contact.lastName && contact.lastName.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1);
      }
    }

    @action
    selectContact(contact: Contact): void {
      this.selectedContact = contact;
    }
}

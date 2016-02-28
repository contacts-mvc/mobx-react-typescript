import {Component} from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';

const classnames = require('classnames');

import CONTACTS from './contacts.data';


// import 'contacts-mvc-css/index.css'; // TODO: use webpack to import the CSS

declare var require;
const DevTools = require('mobx-react-devtools').default; // Use import see #6, add typings

class AppState {
    @observable contacts = [];
    @observable searchQuery: string = '';
    @observable selectedContact: any;

    constructor() {
      this.contacts = CONTACTS;
      this.selectedContact = this.contacts[0];
    }
}



class Divider {
  public isDivider: boolean = true;
  public id: string;
  constructor (public charchtar: string) {
    this.id = Math.random().toString(36);
  }
}


class ContactListDivider extends Component<{charchtar: string; key: string}, {}> {
  render() {
    return (<li key={this.props.key} className="divider">{this.props.charchtar}</li>);
  }
}

class ContactListItem extends Component<{appState: AppState, contact: any; isSelected: boolean; key: string;}, {}> {
  selectContact() {
    this.props.appState.selectedContact = this.props.contact;
  }
  render() {
    const contact = this.props.contact;
    return (<li
              key={this.props.key}
              className={classnames({selected: this.props.isSelected})}
              onClick={this.selectContact.bind(this)} >
                {contact.firstName}&nbsp;<em>{contact.lastName}</em>
          </li>);
  }
}


class ProfilePicture extends Component<{contact: any}, {}> {
  get initials(): string {
    const contact = this.props.contact;
    let initials = '';

    if (contact.firstName) {
      // TODO: use unicode code point
      // initials += String.fromCodePoint(contact.firstName.charCodeAt(0));
      initials += contact.firstName.charAt(0);
    }

    if (contact.lastName) {
      initials += contact.lastName.charAt(0);
    }

    return initials;
  }

  get profilePictureUrl(): string {
    const contact = this.props.contact;

    if (contact.pictures && contact.pictures.length && contact.pictures[0].url) {
      return contact.pictures[0].url;
    }

    return null;
  }

  render() {
    let inner = null;

    if (this.profilePictureUrl) {
      inner = <img className="profile-picture" src={this.profilePictureUrl} />
    } else {
      inner = (<div className="initials">{this.initials}</div>)
    }

    return (<div className="picture">{inner}</div>);
  }
}


@observer
class App extends Component<{appState: AppState}, {}> {

    get contactsAndDividers(): Array<any> {
      const contacts = this.props.appState.contacts;
      const result: Array<any> = [];

      if (!contacts.length) return [];

      result.push(new Divider(contacts[0].firstName.charAt(0)));

      for (let i = 0; i < contacts.length; i++) {
        const element = contacts[i];
        const nextElement = contacts[i+1];

        result.push(element);

        if (nextElement && (nextElement.firstName.charAt(0) !== element.firstName.charAt(0))) {
          result.push(new Divider(nextElement.firstName.charAt(0)));
        }
      }

      return result;
    }

    render() {
        const appState = this.props.appState;

        return (
          <div className="container">
            <header className="main-header"></header>
            <main>
              <aside>
                <div className="search-box">
                  <input
                    type="search"
                    placeholder="Search..."
                    value={appState.searchQuery}
                    onChange={this.searchChanged.bind(this)}/>
                </div>
                <div className="list">
                  <ul>
                    {this.contactsAndDividers.map(item => {
                      if (item instanceof Divider) {
                      return <ContactListDivider key={item.id.toString()} charchtar={item.charchtar} />
                      }
                      const contact = item as any;
                      return <ContactListItem
                                key={contact.id.toString()}
                                contact={contact}
                                appState={this.props.appState}
                                isSelected={this.props.appState.selectedContact === contact}/>
                    })}
                  </ul>
                </div>
              </aside>
              <div className="details">
                <header>
                  <ProfilePicture contact={this.props.appState.selectedContact} />
                  <div className="title">
                    <h1 className="name">{this.props.appState.selectedContact.firstName}&nbsp;{this.props.appState.selectedContact.lastName}</h1>
                    <div className="subtitle">{
                        //this.props.appState.selectedContact.nickName
                    }</div>
                  </div>
                </header>
                <table>
                  <tbody>
                    <tr>
                      <td>email</td>
                      <td>some@example.com</td>
                    </tr>
                  </tbody>
                </table>
                <footer>
                  <div className="left">
                    <button>+</button>
                  </div>
                  <div className="right">
                    <button>Delete</button>
                    <button>Edit</button>
                  </div>
                </footer>
              </div>
            </main>
            <footer className="main-footer"></footer>
            <DevTools />
          </div>
        );
     }

    searchChanged(event: React.SyntheticEvent) {
      const target = event.target as HTMLInputElement;
      this.props.appState.searchQuery = target.value;
    }
};


const appState =  new AppState();
ReactDOM.render(<App appState={appState} />, document.getElementById('root'));
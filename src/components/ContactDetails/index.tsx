import * as React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';

import Contact from '../../interfaces/Contact';
import {ProfilePicture} from './ProfilePicture';
import {AppState} from '../..';

class TableRow extends Component<{label: string; value: string}, {}> {
  render() {
    if (!this.props.value) {
      return <tr></tr>;
    }
    return <tr>
             <td>{this.props.label}</td>
             <td>{this.props.value}</td>
           </tr>
  }
}

@observer
export class ContactDetails extends Component<{params: {contactId: string}, appState: AppState}, {}> {

  componentWillMount() {
    const appState = this.props.appState;
    if (this.props.params.contactId) {
      appState.setSelectedContactId(this.props.params.contactId);
    }
  }

  render() {
    const contact = this.props.appState.selectedContact;

    if (!contact) {
      return <div className="details"></div>
    }

    return (
      <div className="details">
        <header>
          <ProfilePicture contact={contact} />
          <div className="title">
            <h1 className="name">{contact.firstName}&nbsp;{contact.lastName}</h1>
          </div>
        </header>
        <table>
          <tbody>
            <tr>
              <td>{'email'}</td>
              <td>{contact.email}</td>
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
    )
  }
}
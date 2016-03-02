import * as React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';

import Contact from '../../interfaces/Contact';
import {ProfilePicture} from './ProfilePicture';
import {appState} from '../..';

@observer
export class ContactDetails extends Component<{params: {contactId: string}}, {}> {

  contact: Contact;

  constructor(props){
    super(props);

    if (this.props.params.contactId) {
      appState.selectContactById(this.props.params.contactId);
    }

    this.contact = appState.selectedContact;
  }

  render() {
    const contact = this.contact;

    if (!contact) {
      return <div className="details"></div>
    }

    return (
      <div className="details">
        <header>
          <ProfilePicture contact={contact} />
          <div className="title">
            <h1 className="name">{contact.firstName}&nbsp;{contact.lastName}</h1>
            <div className="subtitle">{contact.nickName}</div>
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
    )
  }
}
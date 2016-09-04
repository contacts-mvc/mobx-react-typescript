import * as React from 'react';
import {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {browserHistory, Link} from 'react-router';

import {Empty} from '../Empty';
import {Contact} from '../../interfaces';
import {ProfilePicture} from '../ProfilePicture';
import {AppState} from '../..';

@inject('appState')
@observer
export class ContactDetails extends Component<{appState: AppState}, {}> {

  formatPhoneNumber(raw: string): string {
    return `(${raw.substr(0, 3)}) ${raw.substr(3,3)}-${raw.substr(6)}`;
  }

  render() {
    const contact = this.props.appState.selectedContact;

    if (!contact) {
      return <Empty params={null} />
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
            <TableRow label="email" value={contact.email} />
            <TableRow label="phone" value={this.formatPhoneNumber(contact.phoneNumber)} />
            <TableRow label="address" value={contact.address} />
          </tbody>
        </table>
        <footer>
          <div className="left">
            <Link to="/new" />
          </div>
          <div className="right">
            <button>Delete</button>
            <Link to={contact.id + '/edit'} >Edit</Link>
          </div>
        </footer>
      </div>
    )
  }
}

function TableRow({label, value}) {
  if (!value) {
    return <tr></tr>;
  }
  return <tr>
            <td>{label}</td>
            <td>{value}</td>
          </tr>
}

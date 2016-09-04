import * as React from 'react';
import {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {browserHistory, Link} from 'react-router';

import {AppState} from '../..';
import {ProfilePicture} from '../ProfilePicture';

@inject('appState')
@observer
export class EditContact extends Component<{appState?: AppState, isNew?: boolean}, {}> {

  formatPhoneNumber(raw: string): string {
    return `(${raw.substr(0, 3)}) ${raw.substr(3,3)}-${raw.substr(6)}`;
  }

  quit() {
    if (this.props.isNew) {
      return browserHistory.push('/');
    }
    browserHistory.push('/' + this.props.appState.selectedContact.id);
  }

  save() {
    console.log(this);
    this.quit();
  }

  changed() {
    // TODO
  }

  render() {
    const contact = this.props.appState.selectedContact;

    if (!contact) {
      return <div className="details"></div>
    }

    return (
      <div className="editing details">
        <header>
          <div>
            <ProfilePicture contact={contact} />
            <input type="file" className="upload-picture" />
          </div>
          <div className="title">
            <h1 className="name">
              <input placeholder="First Name" type="text" value={contact.firstName} onChange={this.changed} />
              <span>&nbsp;</span>
              <input placeholder="Last Name" type="text" value={contact.lastName} onChange={this.changed} />
            </h1>
          </div>
        </header>
        <table>
          <tbody>
            <tr>
              <td>email</td>
              <td>
                <input placeholder="Email" value={contact.email} onChange={this.changed}/>
              </td>
            </tr>
            <tr>
              <td>phone</td>
              <td>
                <input placeholder="Phone Number" value={contact.phoneNumber} onChange={this.changed}/>
              </td>
            </tr>
            <tr>
              <td>address</td>
              <td>
                <input placeholder="Address" value={contact.address} onChange={this.changed}/>
              </td>
            </tr>
          </tbody>
        </table>
        <footer>
          <div className="left">
          </div>
          <div className="right">
            <button onClick={this.quit.bind(this)}>Cancel</button>
            <button type="submit" onClick={this.save.bind(this)}>Save</button>
          </div>
        </footer>
      </div>
    )
  }
}
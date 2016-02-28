import * as React from 'react';
import {Component} from 'react';

import Contact from '../../interfaces/Contact';

import {ProfilePicture} from './ProfilePicture';

export class ContactDetails extends Component<{selectedContact: Contact}, {}> {
  render() {
    return (
      <div className="details">
        <header>
          <ProfilePicture contact={this.props.selectedContact} />
          <div className="title">
            <h1 className="name">{this.props.selectedContact.firstName}&nbsp;{this.props.selectedContact.lastName}</h1>
            <div className="subtitle">{
                //this.props.selectedContact.nickName
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
    )
  }
}
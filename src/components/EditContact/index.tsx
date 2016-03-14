import * as React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';

import Contact from '../../interfaces/Contact';

import {AppState} from '../..';

@observer
export class EditContact extends Component<{params: {contactId: string}, appState: AppState}, {}> {

  componentWillMount() {
    const appState = this.props.appState;
    if (this.props.params.contactId) {
      appState.setSelectedContactId(this.props.params.contactId);
    }
  }

  formatPhoneNumber(raw: string): string {
    return `(${raw.substr(0, 3)}) ${raw.substr(3,3)}-${raw.substr(6)}`;
  }

  render() {
    const contact = this.props.appState.selectedContact;

    if (!contact) {
      return <div className="details"></div>
    }

    return (
      <div className="editing details">
        <header>
          <h1>{'EDITING'}</h1>
          <div>{
            //'Profile picture'
          }</div>
          <div className="title">
            <h1 className="name">
              <input type="text" placeholder="First Name" value={contact.firstName}/>
              &nbsp;
              <input type="text" placeholder="Last Name" />
            </h1>
          </div>
        </header>
        <table>
          <tbody>
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
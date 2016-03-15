import * as React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';
import {browserHistory} from 'react-router';

import Contact from '../../interfaces/Contact';

import {AppState, appState} from '../..';

@observer
export class EditContact extends Component<{params: {contactId: string}, contact: Contact, isNew?: boolean}, {}> {

  componentWillMount() {
    if (this.props.params.contactId) {
      appState.setSelectedContactId(this.props.params.contactId);
    }
  }

  formatPhoneNumber(raw: string): string {
    return `(${raw.substr(0, 3)}) ${raw.substr(3,3)}-${raw.substr(6)}`;
  }

  quit() {
    if (this.props.isNew) {
      return browserHistory.push('/');
    }
    browserHistory.push('/' + this.props.params.contactId);
  }

  save() {
    console.log(this);
    this.quit();
  }

  render() {
    const contact = this.props.contact;

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
              <input type="text" placeholder="First Name" value={contact.firstName}/ >
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
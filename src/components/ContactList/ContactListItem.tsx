import {Component} from 'react';
import * as React from 'react';
import {observer, inject} from 'mobx-react';
import {browserHistory} from 'react-router';

import {AppState} from '../..';

declare const require;
const classnames = require('classnames');

@inject('appState')
@observer
export class ContactListItem extends Component<{appState?: AppState, contact: any; isSelected: boolean}, {}> {
  selectContact() {
    browserHistory.push('/' + this.props.contact.id);
    this.props.appState.selectContact(this.props.contact);
  }
  render() {
    const contact = this.props.contact;
    return (<li
              className={classnames({selected: this.props.isSelected})}
              onClick={this.selectContact.bind(this)} >
                {contact.firstName}&nbsp;<em>{contact.lastName}</em>
          </li>);
  }
}
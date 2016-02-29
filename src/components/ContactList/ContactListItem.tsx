import {Component} from 'react';
import * as React from 'react';
import {observer} from 'mobx-react';

import {AppState} from '../..';

declare const require;
const classnames = require('classnames');

@observer
export class ContactListItem extends Component<{appState: AppState, contact: any; isSelected: boolean; key: string;}, {}> {
  selectContact() {
    this.props.appState.setSelectedContact(this.props.contact);
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
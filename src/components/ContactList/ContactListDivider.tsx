import {Component} from 'react';
import * as React from 'react';
import {observer} from 'mobx-react';

@observer
export class ContactListDivider extends Component<{charchtar: string}, {}> {
  render() {
    return (<li className="divider">{this.props.charchtar}</li>);
  }
}
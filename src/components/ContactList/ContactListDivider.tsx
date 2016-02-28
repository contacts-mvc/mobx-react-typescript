import {Component} from 'react';
import * as React from 'react';
import {observer} from 'mobx-react';

@observer
export class ContactListDivider extends Component<{charchtar: string; key: string}, {}> {
  render() {
    return (<li key={this.props.key} className="divider">{this.props.charchtar}</li>);
  }
}
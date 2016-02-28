import * as React from 'react';
import {Component} from 'react';

import Contact from '../../interfaces/Contact';

export class ProfilePicture extends Component<{contact: Contact}, {}> {
  get initials(): string {
    const contact = this.props.contact;
    let initials = '';

    if (contact.firstName) {
      // TODO: use unicode code point
      // initials += String.fromCodePoint(contact.firstName.charCodeAt(0));
      initials += contact.firstName.charAt(0);
    }

    if (contact.lastName) {
      initials += contact.lastName.charAt(0);
    }

    return initials;
  }

  get profilePictureUrl(): string {
    const contact = this.props.contact;

    if (contact.pictures && contact.pictures.length && contact.pictures[0].url) {
      return contact.pictures[0].url;
    }

    return null;
  }

  render() {
    let inner = null;

    if (this.profilePictureUrl) {
      inner = <img className="profile-picture" src={this.profilePictureUrl} />
    } else {
      inner = (<div className="initials">{this.initials}</div>)
    }

    return (<div className="picture">{inner}</div>);
  }
}
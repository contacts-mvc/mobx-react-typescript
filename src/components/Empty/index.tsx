import * as React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';
import {Link, browserHistory} from 'react-router';

import Contact from '../../interfaces/Contact';

export class Empty extends Component<{params}, {}> {
  render() {
    return <div className='empty'>
      Select a contact from the list or <Link to='/new'>create a new one</Link>.
    </div>;
  }
}
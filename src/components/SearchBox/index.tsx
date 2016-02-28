import * as React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';

import Contact from '../../interfaces/Contact';
import {AppState} from '../..';

@observer
export class SearchBox extends Component<{appState: AppState},{}> {
  searchChanged(event: React.SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    this.props.appState.performSearch(target.value);
  }
  render() {
    const appState = this.props.appState;
    return (
      <div className="search-box">
        <input
          type="search"
          placeholder="Search..."
          value={appState.searchQuery}
          onChange={this.searchChanged.bind(this)}/>
      </div>
    );
  }
}
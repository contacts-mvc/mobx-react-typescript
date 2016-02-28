import * as React from 'react';
import {Component} from 'react';

import Contact from '../../interfaces/Contact';
import {AppState} from '../..';

export class SearchBox extends Component<{appState: AppState},{}> {
  searchChanged(event: React.SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    this.props.appState.searchQuery = target.value;
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
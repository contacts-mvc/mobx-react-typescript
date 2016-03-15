import * as React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';
import {browserHistory} from 'react-router';

import Contact from '../../interfaces/Contact';
import {AppState} from '../..';

@observer
export class SearchBox extends Component<{params: {query: string}, appState: AppState},{}> {
  shouldAutoFocus: boolean = false;

  componentWillMount() {
    if (this.props.params.query) {
      this.props.appState.searchQuery = this.props.params.query;
      this.shouldAutoFocus = true;
    }
  }

  componentDidMount() {
    const refs = this.refs as any;

    if (this.shouldAutoFocus) {

      // TODO: move the blinker to the end when focusing (using selection range trick)
      refs.searchInput.focus();
    }
  }

  searchChanged(event: React.SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    const query = target.value;
    this.props.appState.searchQuery = query;
    browserHistory.replace(`/search/${query}`);
  }

  endSeach() {
    if (!this.props.appState.searchQuery) {
      browserHistory.replace('/');
    }
  }

  render() {
    const appState = this.props.appState;
    return (
      <div className="search-box">
        <input
          ref='searchInput'
          type="search"
          placeholder="Search..."
          value={appState.searchQuery}
          onChange={this.searchChanged.bind(this)}
          onBlur={this.endSeach.bind(this)} />
      </div>
    );
  }
}
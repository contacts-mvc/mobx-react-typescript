import {Component} from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {App, ContactDetails, ContactList, EditContact, Empty, SearchBox} from './components';
import {AppState} from './AppState';
export {AppState} from './AppState'; // lazy

const appState =  new AppState();


ReactDOM.render(
  <Provider appState={appState} contact={appState.selectedContact}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Empty} />
        <Route path='search/:query' component={ContactDetails} />
        <Route path='new' component={EditContact} />
        <Route path=':contactId' component={ContactDetails} />
        <Route path=':contactId/edit' component={EditContact} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'));
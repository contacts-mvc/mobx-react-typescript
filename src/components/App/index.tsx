import * as React from 'react';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {SearchBox, ContactList} from '../';

@observer
export class App extends React.Component<{children: any, params: any}, {}> {
  render() {
    return (
      <div className="container">
        <header className="main-header"></header>
        <main>
          <aside>
            <SearchBox params={this.props.params} />
            <ContactList />
          </aside>
          {this.props.children}
        </main>
        <footer className="main-footer"></footer>
        <DevTools />
      </div>
      );
    }
};
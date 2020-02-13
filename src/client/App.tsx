import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Edit from './pages/Edit';
import DisplayBlog from './pages/DisplayBlog';

class App extends React.Component<IAppProps, IAppState> {

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/edit/:id" component={Edit} />
					<Route exact path="/:id" component={DisplayBlog} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export interface IAppProps { }

export interface IAppState { }

export default App;

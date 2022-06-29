import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';

import DeadOrAlive from './components/DeadOrAlive';
import Character from './components/Character';
import SpinningRick from './components/SpinningRick';
import './App.css';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					exact
					path='/dead-or-alive'
					element={<DeadOrAlive />}
				/>
				<Route
					exact
					path='/character/:character_id'
					element={<Character />}
				/>
				<Route path={'/'} element={<SpinningRick />} />
			</Routes>
		</Router>
	);
}

export default App;

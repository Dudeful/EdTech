import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/rickandmorty.png';
import './styles.css';

const SpinningRick = (props) => {
	const [speed, setSpeed] = useState(5);

	function getPos(e) {
		const x = e.clientX;
		const y = e.clientY;

		const newSpeed = x * 0.025 + y * 0.025;

		setSpeed(newSpeed);
	}

	return (
		<div className='App'>
			<Link to={'/dead-or-alive'} onMouseMove={(e) => getPos(e)}>
				<header className='App-header'>
					<img
						src={logo}
						className='App-logo'
						alt='logo'
						style={{
							animation: `App-logo-spin infinite ${speed}s linear`,
							width: props.styling?.width,
							height: props.styling?.height,
							opacity: props.styling?.opacity,
						}}
					/>
				</header>
			</Link>
		</div>
	);
};

export default SpinningRick;

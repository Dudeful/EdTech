import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SpinningRick from '../SpinningRick';
import './styles.css';

const DeadOfAlive = () => {
	const [characters, setCharacters] = useState();
	const [page, setPage] = useState(1);

	useEffect(() => {
		fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
			.then((res) => res.json())
			.then((data) => {
				setCharacters(data);
			});

		window.scrollTo(0, 0);
	}, [page]);

	const pageHandler = (paging) => {
		if (
			(page === 1 && paging === -1) ||
			(page === 42 && paging === 1)
		)
			return;

		console.log(characters);

		setPage(page + paging);
	};

	return (
		<div>
			<header id='header_dead_or_alive'>
				<SpinningRick
					styling={{
						width: '120px',
						height: 'auto',
						opacity: 0.9,
					}}
				/>
				<h1>
					<span style={{ color: 'tomato' }}>DEAD</span>{' '}
					<span style={{ color: '#808080' }}>OR</span>{' '}
					<span style={{ color: 'greenyellow' }}>ALIVE</span>
				</h1>
			</header>

			<main id='cards_display'>
				{characters &&
					characters.results.map((char) => {
						return (
							<Link
								style={{ textDecoration: 'none' }}
								to={`/character/${char.id}`}>
								<div
									key={char.id}
									className={
										'character_card ' +
										(char.status === 'Alive'
											? 'character_card_alive'
											: char.status === 'Dead'
											? 'character_card_dead'
											: 'character_card_unknown')
									}>
									<h3>{char.status}</h3>
									<img src={char.image} alt={char.image} />
									<h3>{char.name}</h3>
									<p>{char.species}</p>
									<p>{char.gender}</p>
									<p>
										<small>origin:</small> {char.origin.name}
									</p>
									<p>
										<small>location:</small> {char.location.name}
									</p>
								</div>
							</Link>
						);
					})}
			</main>

			<div id='paging_buttons'>
				<button onClick={() => pageHandler(-1)}>{'❮'}</button>
				<button onClick={() => pageHandler(1)}>{'❯'}</button>
			</div>
		</div>
	);
};

export default DeadOfAlive;

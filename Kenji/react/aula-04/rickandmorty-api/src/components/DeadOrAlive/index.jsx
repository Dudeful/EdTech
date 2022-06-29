import { useEffect, useState } from 'react';
import SpinningRick from '../SpinningRick';
import styled from 'styled-components';
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

	const Title = styled.h1`
		font-size: 1.5em;
		margin-left: 60px;
		color: tomato;
		letter-spacing: 4px;
		text-shadow: 3px 3px #202020;
		transition: all 0.4s ease-in-out;
	`;

	const Button = styled.button`
		cursor: pointer;
		margin: 10px;
		font-size: 18px;
		padding: 4px 16px;
		font-weight: 600;
		background-color: tomato;
		color: #202020;
		border: none;
		border-radius: 4px;
		transition: all 0.2s ease-in-out;
	`;

	const Card = styled.div`
		flex: 1 1 250px;
		width: min-content;
		text-overflow: ellipsis;
		margin: 40px;
		padding: 20px 30px;
		border-radius: 4px;
		transition: all 0.3s ease-in-out;
	`;

	const Header = styled.header`
		cursor: default;
		padding: 20px 40px;
		display: flex;
		width: 95vw;
	`;

	const CardDeck = styled.div`
		display: flex;
		flex-wrap: wrap;
		margin: 3vh auto;
		width: 85%;
		justify-content: space-around;
	`;

	return (
		<div>
			<Header id='header_dead_or_alive'>
				<SpinningRick
					styling={{
						width: '120px',
						height: 'auto',
						opacity: 0.9,
					}}
				/>
				<Title>
					<span style={{ color: 'tomato' }}>DEAD</span>{' '}
					<span style={{ color: '#808080' }}>OR</span>{' '}
					<span style={{ color: 'greenyellow' }}>ALIVE</span>
				</Title>
			</Header>

			<CardDeck id='cards_display'>
				{characters &&
					characters.results.map((char) => {
						return (
							<Card
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
							</Card>
						);
					})}
			</CardDeck>

			<div id='paging_buttons'>
				<Button onClick={() => pageHandler(-1)}>{'❮'}</Button>
				<Button onClick={() => pageHandler(1)}>{'❯'}</Button>
			</div>
		</div>
	);
};

export default DeadOfAlive;

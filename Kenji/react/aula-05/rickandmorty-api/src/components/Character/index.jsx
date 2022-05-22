import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SpinningRick from '../SpinningRick';
import ModalLogout from '../Modal/ModalLogout';
import './styles.css';

const Character = () => {
	const { character_id } = useParams();
	const [showModal, setShowModal] = useState(false);
	const [character, setCharacter] = useState();

	useEffect(() => {
		fetch(`https://rickandmortyapi.com/api/character/${character_id}`)
			.then((res) => res.json())
			.then((data) => {
				setCharacter(data);
			});
	}, [character_id]);

	if (!character) return <div>loading...</div>;

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
					{character.dead ? (
						<span style={{ color: 'tomato' }}>DEAD</span>
					) : character.alive ? (
						<span style={{ color: 'greenyellow' }}>ALIVE</span>
					) : (
						<span style={{ color: '#808080' }}>UNKNOWN</span>
					)}
				</h1>
				<button id='logout' onClick={() => setShowModal(true)}>
					Logout
				</button>
			</header>

			<main id='cards_display'>
				<div
					className={
						'character_card ' +
						(character.status === 'Alive'
							? 'character_card_alive'
							: character.status === 'Dead'
							? 'character_card_dead'
							: 'character_card_unknown')
					}>
					<h3>{character.status}</h3>
					<img src={character.image} alt={character.image} />
					<h3>{character.name}</h3>
					<p>{character.species}</p>
					<p>{character.gender}</p>
					<p>
						<small>origin:</small> {character.origin.name}
					</p>
					<p>
						<small>location:</small> {character.location.name}
					</p>
				</div>
			</main>

			<ModalLogout
				title='Are you sure you want to logout?'
				onClose={() => setShowModal(false)}
				showModal={showModal}>
				<a style={{ textDecoration: 'none' }} href='/'>
					logout
				</a>
			</ModalLogout>
		</div>
	);
};

export default Character;

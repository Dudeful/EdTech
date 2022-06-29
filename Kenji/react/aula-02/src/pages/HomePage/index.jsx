import {
	useContext,
	useEffect,
	useState,
	createElement,
} from 'react';
import { useNavigate } from 'react-router-dom';
import StandardHeader from '../../components/headers/StandardHeader';
import LogoutButton from '../../components/buttons/LogoutButton';
import { AuthContext } from '../../context/auth';
import './style.css';

function HomePage() {
	const navigate = useNavigate();
	const { user, authenticated } = useContext(AuthContext);
	const [userData, setUserData] = useState({});

	useEffect(() => {
		(async () => {
			if (!authenticated) {
				navigate('/login');
			} else {
				const api = 'http://localhost:3001/';
				const response = await fetch(
					`${api}view?table=username&id=${user.username}`
				);
				const data = await response.json();
				console.log(data);
				setUserData(data);
			}
		})();
	}, [authenticated, navigate, user]);

	const handleNavEdit = (e) => {
		e.preventDefault();
		navigate('/edit-profile');
	};

	return createElement(
		'div',
		{
			className: 'page',
			id: 'home-page',
		},
		createElement(
			StandardHeader,
			null,
			createElement(LogoutButton, null)
		),
		createElement(
			'main',
			{
				id: 'home-page-main',
			},
			createElement(
				'div',
				{
					id: 'profile-picture',
				},
				userData.photo
					? createElement('img', {
							src: userData.photo,
							alt: 'Profile',
					  })
					: createElement('img', {
							src: 'https://t4.ftcdn.net/jpg/03/31/69/91/360_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg',
							alt: 'Profile',
					  })
			),
			createElement(
				'div',
				{
					id: 'profile-info',
				},
				createElement(
					'h2',
					{
						id: 'username',
					},
					userData.username
				),
				createElement(
					'p',
					{
						id: 'email',
					},
					'Email: ',
					userData.email
				),
				createElement(
					'p',
					{
						id: 'birthdate',
					},
					'Birthdate:',
					' ',
					new Date(userData.birthdate).toLocaleDateString('pt-br', {
						timeZone: 'UTC',
					})
				)
			),
			createElement(
				'div',
				{
					className: 'navigate-buttons',
				},
				createElement(
					'button',
					{
						id: 'edit-button',
						onClick: handleNavEdit,
					},
					'Edit Profile'
				)
			)
		)
	);
}

export default HomePage;

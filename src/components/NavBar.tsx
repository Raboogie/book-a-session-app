import { navBarContent } from '../lib/appConstants.ts';
import { NavLink } from 'react-router-dom';
import { Button } from './UI/Button.tsx';
import UpcomingSession from './sessions/UpcomingSession.tsx';
import { useState } from 'react';

function NavBar() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			{isModalOpen && <UpcomingSession onClose={closeModal} />}
			<header id="main-header">
				<h1>{navBarContent.title}</h1>
				<nav>
					<ul>
						{navBarContent.links.map((link) => (
							<NavLink to={link.url} key={link.text}>
								{' '}
								<li> {link.text} </li>{' '}
							</NavLink>
						))}
						<li>
							<Button
								className="button"
								onClick={showModal}
								elementType={'button'}
							>
								Upcoming Sessions
							</Button>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}

export default NavBar;
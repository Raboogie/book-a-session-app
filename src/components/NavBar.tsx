import { navBarContent } from '../lib/appConstants.ts';
import { NavLink } from 'react-router-dom';
import { Button } from './UI/Button.tsx';
import UpcomingSession from './sessions/UpcomingSession.tsx';
import { useEffect, useState } from 'react';
import '../Css/NavBar.css';
import { useAuth } from "../lib/UserContext.tsx";


function NavBar() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	const { isAuthenticated, user, logout } = useAuth();


	useEffect(() => {
		console.log("isAuthenticated: ", isAuthenticated);
		console.log("user: ", user);
	}, [isAuthenticated, user]);

    // After a successful login, remove the login link from the navBar.
    // Create a sign-out link and place after "Upcoming Sessions" button.
    // "Upcoming Sessions" button should only be shown when signed in.
	return (
		<>
			{isModalOpen && <UpcomingSession onClose={closeModal} />}
			<header id="main-header">
				<h1>{navBarContent.title}</h1>
				<nav>
					<ul>
						{
							navBarContent.links.filter((link) => isAuthenticated ? link.text !== 'Login' : true).map((link) => (
								<NavLink to={link.url} key={link.text}>
									{' '}
									<li> {link.text} </li>{' '}
								</NavLink>
							))
						}
						{user && (
							<>
								<li>
									<Button
										className="button"
										onClick={showModal}
										elementType={'button'}
									>
										Upcoming Sessions
									</Button>
								</li>
								<li>
									<Button className="button" onClick={logout} elementType={'button'}>
										Logout
									</Button>
								</li>
							</>
						)}
					</ul>
				</nav>
			</header>
		</>
	);
}

export default NavBar;
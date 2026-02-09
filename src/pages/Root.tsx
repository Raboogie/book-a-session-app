import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar.tsx';
// import SideBar from '../components/UI/SideBar.tsx';
import '../Css/Root.css';

export default function Root() {
	return (
		<>
			<div className="grid-container">
				<div className="navBar">
					<NavBar />
				</div>
				<div className="mainContent">
					<Outlet />
				</div>
			</div>
		</>
	);
}

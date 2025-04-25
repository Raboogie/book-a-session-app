import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useBookedSessionContext } from "../lib/SessionContext.tsx";
import '@testing-library/jest-dom';
import NavBar from './NavBar.tsx';

jest.mock('../lib/SessionContext.tsx', () => ({
	useBookedSessionContext: jest.fn(),
}));

const mockShowModal = jest.fn();
HTMLDialogElement.prototype.showModal = mockShowModal;



describe('NavBar Component', () => {

	(useBookedSessionContext as jest.Mock).mockReturnValue({
		session: [],
	});

	it('Render NavBar with correct data', () => {
		render(
			<Router>
				<NavBar />
			</Router>
		);

		const upcomingSessionBtn = screen.getByText("Upcoming Sessions");
		fireEvent.click(upcomingSessionBtn);
		expect(screen.getByText('ReactMentoring')).toBeInTheDocument();

		const closeModalBtn = screen.getByText('Close');
		fireEvent.click(closeModalBtn);
		expect(screen.queryByText('Upcoming Sessions')).toBeInTheDocument();
	});
});

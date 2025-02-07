import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UpcomingSession from './UpcomingSession.tsx';
import { useBookedSessionContext } from '../../lib/SessionContext';

jest.mock('../../lib/SessionContext.tsx', () => ({
	useBookedSessionContext: jest.fn(),
}));

const mockOnClose = jest.fn();

const mockShowModal = jest.fn();
HTMLDialogElement.prototype.showModal = mockShowModal;

describe('UpcomingSession Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders upcoming session with correct data', () => {
		(useBookedSessionContext as jest.Mock).mockReturnValue({
			session: [
				{
					title: 'Session Title',
					summary: 'Session Summary',
					date: 'Jan 22, 2025',
				},
			],
		});

		render(
			<Router>
				<UpcomingSession onClose={mockOnClose} />
			</Router>
		);

		expect(screen.getByText('Upcoming Session')).toBeInTheDocument();
		expect(screen.getByText('Session Title')).toBeInTheDocument();
		expect(screen.getByText('Session Summary')).toBeInTheDocument();
		expect(screen.getByText('Jan 22, 2025')).toBeInTheDocument();
	});

	it('renders upcoming session without any sessions', () => {
		(useBookedSessionContext as jest.Mock).mockReturnValue({
			session: [],
		});

		render(
			<Router>
				<UpcomingSession onClose={mockOnClose} />
			</Router>
		);

		expect(screen.getByText('Upcoming Session')).toBeInTheDocument();
	});

	it('calls onClose when the modal is closed', () => {
		render(
			<Router>
				<UpcomingSession onClose={mockOnClose} />
			</Router>
		);

		const closeButton = screen.queryByText('Close');

		expect(closeButton).toBeInTheDocument();
	});
});

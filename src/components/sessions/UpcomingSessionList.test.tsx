import { screen, render } from '@testing-library/react';
import UpcomingSessionList from './UpcomingSessionList.tsx';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../lib/SessionContext.tsx', () => ({
	useBookedSessionContext: jest.fn(),
}));

describe('Should display a list of upcoming sessions', () => {
	it('renders a list of sessions', () => {
		render(
			<Router>
				<UpcomingSessionList
					upcomingSessions={[
						{
							id: 'sess01',
							title: 'Session Title',
							summary: 'Session Summary',
							date: 'Jan 22, 2025',
						},
					]}
				/>
			</Router>
		);

		expect(screen.getByText('Session Title')).toBeInTheDocument();
		expect(screen.getByText('Session Summary')).toBeInTheDocument();
	});
});

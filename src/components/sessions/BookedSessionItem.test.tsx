import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookedSessionItem from './BookedSessionItem';
import { useBookedSessionContext } from '../../lib/SessionContext.tsx';

jest.mock('../../lib/SessionContext.tsx', () => ({
	useBookedSessionContext: jest.fn(),
}));

test('should display the correct title, summary, and date', () => {
	render(
		<BookedSessionItem
			id="sess01"
			title="someTitle"
			summary="aSummary"
			date="Jan 22, 2025"
		/>
	);

	expect(screen.getByText('someTitle')).toBeInTheDocument();
	expect(screen.getByText('aSummary')).toBeInTheDocument();
	expect(screen.getByText('Jan 22, 2025')).toBeInTheDocument();
});

test('should call clearSession when cancel button is clicked', () => {
	const clearSessionMock = jest.fn();
	(useBookedSessionContext as jest.Mock).mockReturnValue({
		clearSession: clearSessionMock,
	});

	render(
		<BookedSessionItem
			id="sess01"
			title="someTitle"
			summary="aSummary"
			date="Jan 22, 2025"
		/>
	);

	const cancelButton = screen.getByText('Cancel');
	fireEvent.click(cancelButton);

	expect(clearSessionMock).toHaveBeenCalledWith('sess01');
});

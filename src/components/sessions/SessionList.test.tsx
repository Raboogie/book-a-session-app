import { render, screen } from '@testing-library/react';
import { SessionList } from './SessionList.tsx';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SessionList', () => {
	it('renders a list of sessions', () => {
		render(
			<Router>
				<SessionList
					sessions={[
						{
							id: 'sess01',
							title: 'Session Title',
							summary: 'Session Summary',
							image: 'image-url.jpg',
						},
						{
							id: 'sess02',
							title: 'Session Title 2',
							summary: 'Session Summary 2',
							image: 'image-url-2.jpg',
						},
					]}
				/>
			</Router>
		);

		expect(screen.getByText('Session Title')).toBeInTheDocument();
		expect(screen.getByText('Session Summary')).toBeInTheDocument();
		expect(screen.getByText('Session Title 2')).toBeInTheDocument();
		expect(screen.getByText('Session Summary 2')).toBeInTheDocument();
	});
});

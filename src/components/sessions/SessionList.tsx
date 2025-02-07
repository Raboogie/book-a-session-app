import { SessionItem } from './SessionItem.tsx';

type SessionsListProps = {
	sessions: {
		id: string;
		title: string;
		summary: string;
		image: string;
	}[];
};

export const SessionList = ({ sessions }: SessionsListProps) => {
	// debug and see what's in the sessions prop
	return (
		<>
			<ul id="sessions-list">
				{sessions.map((session) => (
					<li key={session.id}>
						<SessionItem {...session} />
					</li>
				))}
			</ul>
		</>
	);
};

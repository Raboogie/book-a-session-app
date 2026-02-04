import Modal, { ModalHandle } from '../UI/Modal.tsx';
import { useEffect, useRef } from 'react';
import UpcomingSessionList from './UpcomingSessionList.tsx';
import {useSessionStore} from "../../lib/useSessionStore.ts";

type UpcomingSessionProps = {
	onClose: () => void;
};

const UpcomingSession = ({ onClose }: UpcomingSessionProps) => {
	const modal = useRef<ModalHandle | null>(null);
	const sessions = useSessionStore((state) => state.session);


	useEffect(() => {
		if (modal.current) {
			modal.current.open();
		}
	}, []);

	return (
		<>
			<Modal ref={modal} onClose={onClose}>
				<h2>Upcoming Session</h2>
				{sessions.length === 0 && (
					<>
						<main id="session-page">
							<p>No session found!</p>
						</main>
					</>
				)}
				{sessions.length > 0 && (
					<UpcomingSessionList
						upcomingSessions={sessions}
					/>
				)}
				<p className="actions">
					<button className="button" onClick={onClose}>
						Close
					</button>
				</p>
			</Modal>
		</>
	);
};
export default UpcomingSession;

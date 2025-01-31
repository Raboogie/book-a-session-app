import Modal, {ModalHandle} from "../UI/Modal.tsx";
import {useEffect, useRef} from "react";
import {useBookedSessionContext} from "../../lib/SessionContext.tsx";
import UpcomingSessionList from "./UpcomingSessionList.tsx";
type UpcomingSessionProps = {
    onClose: () => void;
};

const UpcomingSession = ({onClose}: UpcomingSessionProps) => {

    const modal = useRef<ModalHandle | null>(null);
    const bookedSessionCtx = useBookedSessionContext();

    useEffect(() => {
        if (modal.current) {
            modal.current.open();
        }
    }, []);

    return (
        <>
            <Modal ref={modal} onClose={onClose}>
                <h2>Upcoming Session</h2>
                {bookedSessionCtx.session.length === 0 && (
                    <>
                        <main id="session-page">
                            <p>No session found!</p>
                        </main>
                    </>
                )}
                {bookedSessionCtx && (
                    <UpcomingSessionList upcomingSessions={bookedSessionCtx.session}/>
                )}
                <p className='actions'>
                <button className='button' onClick={onClose}>Close</button>
                </p>
            </Modal>
        </>
    );
};
export default UpcomingSession;
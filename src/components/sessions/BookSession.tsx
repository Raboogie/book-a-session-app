import Modal, {ModalHandle} from "../UI/Modal.tsx";
import {FormEvent, useEffect, useRef} from "react";
import {Button} from "../UI/Button.tsx";
//import {useBookedSessionContext} from "../../lib/SessionContext.tsx";
import {SessionType} from "../../lib/SessionContext.tsx";
import {SessionShape, useSessionStore} from "../../lib/useSessionStore.ts";


type BookSessionProps = {
    onClose: () => void;
    loadedSession: SessionType;
};

export const BookSession = ({onClose, loadedSession}:BookSessionProps) => {
    const modal = useRef<ModalHandle | null>(null);
    //const bookedSessionCtx = useBookedSessionContext();
    const setSession= useSessionStore((state) => (state.setSession))

    useEffect(() => {
        if (modal.current) {
            modal.current.open();
        }
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        // loadedSession.user.name = data.name as string;
        // loadedSession.user.email = data.email as string;

        // todo - There a bug that causes the array to be empty when a session is first added
        // Update how user data is assigned to loadedSession
        // const updatedSession: SessionType = {
        //     ...loadedSession,
        //     user: {
        //         name: data.name as string,
        //         email: data.email as string,
        //     }
        // };
        // Map the loadedSession (SessionType) to the store's expected format (SessionShape)
        const bookedSession: SessionShape = {
            id: loadedSession.id,
            title: loadedSession.title,
            summary: loadedSession.summary,
            description: loadedSession.description,
            date: loadedSession.date,
            image: loadedSession.image,

        };
        // save the data using React context api
        //bookedSessionCtx.addSession(updatedSession);
        setSession([bookedSession]);
        console.log(data);

        //console.log("Loaded Session Data:",bookedSessionCtx.session);
        console.log("BookedSession: ", bookedSession);
        console.log("SessionStore Sessions: ", useSessionStore.getState().session);
        onClose();
    }

    return (
        <>
            <Modal ref={modal} onClose={onClose}>
                <h2>Book Session</h2>
                <form onSubmit={handleSubmit}>
                    <div className='control'>
                        <label htmlFor='name'>YOUR NAME</label>
                        <input type='text' id='name' name='name'/>
                    </div>
                    <div className='control'>
                        <label htmlFor='email'>YOUR EMAIL</label>
                        <input type='email' id='email' name='email'/>
                    </div>

                    <p className='actions'>
                        <Button className='button button--text-only' elementType="button" onClick={onClose}>Cancel</Button>
                        <button className="button" type='submit'>Book Session</button>
                    </p>
                </form>
            </Modal>
        </>
    );
};

import Modal, {ModalHandle} from "../UI/Modal.tsx";
import {FormEvent, useEffect, useRef} from "react";
import {Button} from "../UI/Button.tsx";
import {useBookedSessionContext} from "../../lib/SessionContext.tsx";

type SessionType = {
    id: string;
    title: string;
    summary: string;
    description: string;
    duration: number;
    date: string;
    image: string;
};

type BookSessionProps = {
    onClose: () => void;
    loadedSession: SessionType;
};

export const BookSession = ({onClose, loadedSession}:BookSessionProps) => {
    const modal = useRef<ModalHandle | null>(null);
    const bookedSessionCtx = useBookedSessionContext();

    useEffect(() => {
        if (modal.current) {
            modal.current.open();
        }
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        // save the data using React context api
        bookedSessionCtx.addSession(loadedSession);
        console.log(data);

        // loadedSession Data
        console.log("Loaded Session Data:",bookedSessionCtx.session);
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

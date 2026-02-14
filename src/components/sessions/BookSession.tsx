import Modal, {ModalHandle} from "../UI/Modal.tsx";
import {FormEvent, useEffect, useRef} from "react";
import {Button} from "../UI/Button.tsx";
import {SessionType} from "../../lib/SessionContext.tsx";
import {SessionShape, useSessionStore} from "../../lib/useSessionStore.ts";


type BookSessionProps = {
    onClose: () => void;
    loadedSession: SessionType;
};

export const BookSession = ({onClose, loadedSession}:BookSessionProps) => {
    const modal = useRef<ModalHandle | null>(null);
    const setSession= useSessionStore((state) => (state.setSession))

    useEffect(() => {
        if (modal.current) {
            modal.current.open();
        }
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();

        const bookedSession: SessionShape = {
            id: loadedSession.id,
            title: loadedSession.title,
            summary: loadedSession.summary,
            description: loadedSession.description,
            date: loadedSession.date,
            image: loadedSession.image,

        };

        setSession([bookedSession]);
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

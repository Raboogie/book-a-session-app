import { useParams } from 'react-router-dom';
import { SESSIONS } from '../dummy-sessions.ts';
import {Button} from "../components/UI/Button.tsx";
import React, {useEffect, useState} from "react";
import {BookSession} from "../components/sessions/BookSession.tsx";
import {useBookedSessionContext} from "../lib/SessionContext.tsx";

export default function SessionPage() {
  const params = useParams<{ id: string }>();

  const sessionId = params.id;
  const loadedSession = SESSIONS.find((session) => session.id === sessionId);
  const [showDialog, setShowDialog] = useState(false);
  const bookedSessionCtx = useBookedSessionContext();

  useEffect(() => {
    console.log("Loaded SessionPage bookedSessionCtx Data:",bookedSessionCtx.session);
  },[bookedSessionCtx.session]);

  const showModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowDialog(true);
  };

  const onClose = () => {
    setShowDialog(false);
  };

  if (!loadedSession) {
    return (
      <main id="session-page">
        <p>No session found!</p>
      </main>
    );
  }

  return (
    <main id="session-page">
      {showDialog && (<BookSession loadedSession={loadedSession} onClose={onClose}/>)}
      <article>
        <header>
          <img
              src={loadedSession.image}
              alt={loadedSession.title}
          />
          <div>
            <h2>{loadedSession.title}</h2>
            <time dateTime={new Date(loadedSession.date).toISOString()}>
              {new Date(loadedSession.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            <p>
              {/* Todo: Add button that opens "Book Session" dialog / modal */}
              <Button className='button' elementType={"button"} onClick={showModal}>Book
                Session</Button>
            </p>
          </div>
        </header>
        <p id="content">{loadedSession.description}</p>
      </article>
    </main>
  );
}

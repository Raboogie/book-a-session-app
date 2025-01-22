import React, { createContext } from 'react';

export type SessionType = {
	// // user inputs
	// name: string;
	// email: string;

	// session data
	id: string;
	title: string;
	summary: string;
	description: string;
	duration: number;
	date: string;
	image: string;
};

type SessionState = {
	session: SessionType[];
};

type SessionContextValue = SessionState & {
	addSession: (session: SessionType) => void;
	clearSession: (id: string) => void;
};

type sessionContextProviderProps = {
	children: React.ReactNode;
};

const BookedSessionContext = createContext<SessionContextValue | null>(null);

export const useBookedSessionContext = () => {
	const bookedSessionCtx = React.useContext(BookedSessionContext);
	if (!bookedSessionCtx) {
		throw new Error('useBookedSessionContext Should not be null!');
	}
	return bookedSessionCtx;
};

const BookedSessionsContextProvider = ({
	children,
}: sessionContextProviderProps) => {
	const [session, setSession] = React.useState<SessionType[]>([]);

	const addSession = (session: SessionType) => {
		setSession((prevSessions) => [...prevSessions, session]);
	};

	const clearSession = (id: string) => {
		setSession((prevSessions) => prevSessions.filter((s) => s.id !== id));
	};

	const contextValue: SessionContextValue = {
		session,
		addSession,
		clearSession
	};

	return (
		<BookedSessionContext.Provider value={contextValue}>
			{children}
		</BookedSessionContext.Provider>
	);
};

export default BookedSessionsContextProvider;

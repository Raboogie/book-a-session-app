import React, {createContext} from "react";

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
    isBooked: boolean;
    session: SessionType[];
};

type SessionContextValue = SessionState & {
    addSession: (session: SessionType) => void;
    clearSession: () => void;
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

const BookedSessionsContextProvider = ({children}: sessionContextProviderProps) => {
    const [session, setSession] = React.useState<SessionType[]>([]);
    const [isBooked, setIsBooked] = React.useState<boolean>(false);

    const addSession = (session: SessionType) => {
        setSession((prevSessions) => [...prevSessions, session]);
        setIsBooked(true);
    };

    const clearSession = () => {
        setSession([]);
        setIsBooked(false);
    };

    const contextValue: SessionContextValue = {
        isBooked,
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

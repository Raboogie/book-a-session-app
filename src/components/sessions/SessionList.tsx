import {SessionItem} from "./SessionItem.tsx";

type SessionsListProps = {
    sessions: {
        id: string;
        title: string;
        summary: string;
        image: string;
    }[];
};

export const SessionList = ({sessions}:SessionsListProps) => {
    return (
        <>
            <ul id='sessions-list'>
                {sessions.map((session) => (
                    <li key={session.id}>
                        <SessionItem  {...session} />
                    </li>
                ))}
            </ul>
        </>
    );
};

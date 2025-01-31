import BookedSessionItem from "./BookedSessionItem.tsx";

type UpcomingSessionListProps = {
    upcomingSessions: {
        id: string;
        title: string;
        summary: string;
        date: string;
    }[];
};

const UpcomingSessionList = ({upcomingSessions}: UpcomingSessionListProps
) => {
    return (
        <>
            <ul id='upcoming-sessions-list'>
                {upcomingSessions.map((session) => (
                    <li key={session.id}>
                        <BookedSessionItem {...session} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default UpcomingSessionList;
import {screen, render, fireEvent} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import {BookSession} from "./BookSession.tsx";
import '@testing-library/jest-dom';
import {useBookedSessionContext} from "../../lib/SessionContext.tsx";

jest.mock('../../lib/SessionContext.tsx', () => ({
    useBookedSessionContext: jest.fn(),
}));

const mockShowModal = jest.fn();
HTMLDialogElement.prototype.showModal = mockShowModal;

describe('BookSession Component', () => {
    const mockOnClose = jest.fn();
    const mockLoadedSession = {
        id: "sess02",
        title: "Session Title",
        summary: "A summary of the session",
        description: "A description on the session",
        duration: 1.5,
        date: "2023-11-03",
        image: "/src/assets/sessions/debug-code.jpg",
    }

    it('renders book session with correct data', () => {
        const addSessionMock = jest.fn();
        (useBookedSessionContext as jest.Mock).mockReturnValue(
            {
                addSession: addSessionMock
            }
        );

        render(
            <Router>
                <BookSession
                    onClose={mockOnClose}
                    loadedSession={mockLoadedSession}
                />
            </Router>
        );

        const headerTitle = screen.getAllByText('Book Session');

        const btnTextTitle = screen.getAllByText('Book Session');
        fireEvent.click(btnTextTitle[1]);

        expect(headerTitle[0]).toBeInTheDocument();
        expect(addSessionMock).toHaveBeenCalledWith(mockLoadedSession);
    });
});
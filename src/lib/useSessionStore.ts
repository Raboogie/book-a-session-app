import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface SessionShape {
    id: string;
    title: string;
    description: string;
    summary: string;
    // sessionPrice: number;
    // sessionDate: Date;
    // sessionStartTime: String;
    // sessionDuration: number;
    image: string;
    date: string;

    // need to add later;
    // sessionTopic
    // mentor
}

// Define the shape of the store
interface SessionState {

    session: SessionShape[];
    setSession: (session: SessionShape[]) => void;
    clearSession: (id: string) => void;
    updateSessionTitle: (id: string, newTitle: string) => void ;
    updateSessionDescription: (id: string, newDescription: string) => void;
    updateSessionSummary: (id: string, newSummary: string) => void;

}

export const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({

    session: [],
    setSession: (newSession: SessionShape[]) => set((state) => ({session: [...state.session, ...newSession]})),

    clearSession: (id: string) => set((state) => ({
        session: state.session.filter((s) => (s.id !== id))
    })),

    updateSessionTitle: (id: string, newTitle: string) => set((state) => ({
        session: state.session.map((s) => (s.id === id ? {...s, title: newTitle} : s))
    })),

    updateSessionDescription: (id: string, newDescription: string) => set((state) => ({
        session: state.session.map((s) => (s.id === id ? {...s, description: newDescription} : s))
    })),

    updateSessionSummary: (id: string, newSummary: string) => set((state) => ({
        session: state.session.map((s) => (s.id === id ? {...s, summary: newSummary} : s))
    }))
        }),
        {
            name: 'booked-sessions-storage', // unique name for the key in localStorage
            storage: createJSONStorage(() => localStorage), // (optional) explicitly use localStorage
        }
    )
);
/*
import { render, screen } from '@testing-library/react';
import { SessionItem } from './SessionItem';
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom';
import {ReactNode} from "react";

jest.mock('../UI/Button.tsx', () => ({
    Button: jest.fn(({ children, ...props }) => (
        <a {...props}>{children}</a>
    )),
}));


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    BrowserRouter: ({ children }:{ children: ReactNode }) => <div>{children}</div>,
}));

describe('SessionItem Component', () => {
    it('renders session item with correct data', () => {
        render(
            <Router>
                <SessionItem
                    id="sess01"
                    title="Session Title"
                    summary="Session Summary"
                    image="image-url.jpg"
                />
            </Router>
        );

        expect(screen.getByAltText('Session Title')).toBeInTheDocument();
        expect(screen.getByText('Session Title')).toBeInTheDocument();
        expect(screen.getByText('Session Summary')).toBeInTheDocument();
        expect(
            screen.getByRole('a', { name: /learn more/i })
        ).toHaveAttribute('href', '/sess01');
    });

    it('renders default image if image URL is missing', () => {
        render(
            <Router>
                <SessionItem
                    id="sess02"
                    title="Session Title"
                    summary="Session Summary"
                    image=""
                />
            </Router>
        );

        expect(screen.getByAltText('Session Title')).toHaveAttribute(
            'src',
            'default-image.jpg'
        );
    });

    it('renders without crashing when props are empty strings', () => {
        render(
            <Router>
                <SessionItem id="" title="" summary="" image="" />
            </Router>
        );

        expect(
            screen.getByRole('a', { name: /learn more/i })
        ).toHaveAttribute('href', '/');
    });
});
*/


// This below code is working for SessionItem.test.tsx. Im trying get SessionItem.test.tsx to work with React router dom test.
import { render, screen } from '@testing-library/react';
import { SessionItem } from './SessionItem';
import {jest} from '@jest/globals';
import '@testing-library/jest-dom';


jest.mock('../UI/Button.tsx', () => ({
    Button: jest.fn(({ children, ...props }) => (
        <a {...props}>{children}</a>
    )),
}));




describe('SessionItem Component', () => {

    it('renders session item with correct data', () => {
        render(
            <SessionItem
                id="sess01"
                title="Session Title"
                summary="Session Summary"
                image="image-url.jpg"
            />
        );

        expect(screen.getByAltText('Session Title')).toBeInTheDocument();
        expect(screen.getByText('Session Title')).toBeInTheDocument();
        expect(screen.getByText('Session Summary')).toBeInTheDocument();
        expect(
            screen.getByText(/learn more/i)
        ).toBeInTheDocument();
    });
});
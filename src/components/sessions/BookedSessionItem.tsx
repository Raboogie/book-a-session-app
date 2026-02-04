//import React from "react";
import {useSessionStore} from "../../lib/useSessionStore.ts";

type BookedSessionItemProps = {
	id: string;
	title: string;
	summary: string;
	date: string;
};

const BookedSessionItem = ({
	id,
	title,
	summary,
	date,
}: BookedSessionItemProps) => {
	const clearSession = useSessionStore((state) => state.clearSession);

	const cancelSessionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		clearSession(id);
	};

	return (
		<div data-testid="test-element">
			<article className="upcoming-session">
				<div>
					<h3>{title}</h3>
					<p>{summary}</p>
					<time>{date}</time>
				</div>
				<p className="button--text-only">
					<button
						className="button button--text-only"
						onClick={cancelSessionHandler}
					>
						Cancel
					</button>
				</p>
			</article>
		</div>
	);
};

export default BookedSessionItem;

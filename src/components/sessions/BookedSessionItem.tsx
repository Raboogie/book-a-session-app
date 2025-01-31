//import React from "react";
import { useBookedSessionContext } from '../../lib/SessionContext.tsx';

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
	const bookedSessionCtx = useBookedSessionContext();

	const cancelSessionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		bookedSessionCtx.clearSession(id);
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

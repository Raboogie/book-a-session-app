import {Button} from "../UI/Button.tsx";

type SessionItemProps = {
    id: string;
    title: string;
    summary: string;
    image: string;
}
export const SessionItem = ({id, title, summary, image}:SessionItemProps) => {
    return (
        <>
            <article className='session-item'>
                <img src={image} alt={title} />
                <div className='session-data'>
                    <div>
                        <h3>{title}</h3>
                        <p>{summary}</p>
                    </div>
                    <p  className='actions'>
                        <Button className='button' elementType='link' to={`${id}`}>Learn More</Button>
                    </p>
                </div>
            </article>
        </>
    );
};

import "../Css/CreateSession.css"
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link} from "react-router-dom";

const sessionInputSchema = z.object({
    sessionTitle: z.string().min(6, {
        message: 'Title must be at least 6 characters long'

    }),
    sessionSummary: z.string().min(6, {
        message: 'Summary must be at least 6 characters long'
    }),
    sessionDescription: z.string().min(6, {
        message: 'Description must be at least 6 characters long'
    }),
    sessionDate: z.date(),
    sessionTime: z.string(),
    sessionDuration: z.int(),
    sessionTopic: z.string(),
});

export type InputFormData = z.infer<typeof sessionInputSchema>;


export const CreateSession = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputFormData>({
        resolver: zodResolver(sessionInputSchema),
        defaultValues: {
            sessionTitle: '',
            sessionSummary: '',
            sessionDescription: '',
            sessionDate: new Date(),
            sessionTime: '12:00',
            sessionTopic: '',
        },
    });

    const onSubmit: SubmitHandler<InputFormData> = (data) => {
        console.log('Session Created:', data);
    };

    return (
        <>
            <div className="createSession">
                <div className="back-link-container">
                    <Link to="/profile" className="back-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Profile
                    </Link>
                </div>
                <div className="createSessionHeader">
                    <h1>Create New Session</h1>
                    <h2>Share your expertise and grow the React community.</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="sessionTitle">Session Title</label>
                        <input
                            id="sessionTitle"
                            type="text"
                            className="form-input"
                            placeholder="e.g. Mastering React Context API"
                            {...register('sessionTitle')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="sessionSummary">Summary</label>
                        <input
                            id="sessionSummary"
                            type="text"
                            className="form-input"
                            placeholder="e.g. A deep dive into global state management"
                            {...register('sessionSummary')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="sessionDescription">Description</label>
                        <textarea
                            id="sessionDescription"
                            className="form-input"
                            rows={4}
                            placeholder="e.g. In this session we will cover..."
                            {...register('sessionDescription')}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div>
                            <label htmlFor="sessionDate">Date</label>
                            <input
                                id="sessionDate"
                                type="date"
                                className="form-input"
                                {...register('sessionDate')}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="sessionTime">Time</label>
                            <input
                                id="sessionTime"
                                type="time"
                                className="form-input"
                                {...register('sessionTime')}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="sessionDuration">Duration (min)</label>
                            <input
                                id="sessionDuration"
                                type="number"
                                className="form-input"
                                {...register('sessionDuration')}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit">Create Session</button>
                    </div>
                </form>
            </div>
        </>
    );
};

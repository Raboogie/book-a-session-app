import "../Css/Login.css";
import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { z } from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "../lib/UserContext.tsx";
import {api} from "../lib/api.ts";

const userInputSchema = z.object({
    email: z.email(),
    password: z.string()
})

export type InputFormData = z.infer<typeof userInputSchema>;

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm<InputFormData>({
        resolver: zodResolver(userInputSchema)
    });


    const onSubmit: SubmitHandler<InputFormData> = async (formData) => {
        setLoginError(null);
        try {
            const response =  await api.post('/auth/login', formData);
            const { user, accessToken } = response.data;

            // We pass only the user info to our context.
            login(user, accessToken);
            navigate('/');
        } catch (error: any) {
            console.error("Login Error", error);
            console.log(loginError);
            if (error.response && error.response.status === 401) {
                setLoginError("Invalid email or password");
            } else {
                setLoginError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <>
            <div className="logIn-wrapper">
                <div className="logIn-card">
                    <div className="logIn-header">
                        <h2>Login</h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Field */}
                        <div className="form-group">
                            <div className="input-wrapper">
                                {/* Email Icon SVG */}
                                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="Email Address"
                                    {...register('email')}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <div className="input-wrapper">
                                {/* Lock Icon SVG */}
                                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-input"
                                    placeholder="Password"
                                    {...register('password')}
                                    required
                                />
                                {/* Show/Hide Password Toggle */}
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">
                            LogIn
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <div className="form-footer">
                        Dont Have an account? <Link to="/signUp" className="link">Sign Up</Link>
                    </div>
                </div>

            </div>

        </>
    );
}

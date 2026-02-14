import '../Css/ProfilePage.css';
import {useEffect} from "react";
import {useAuth} from "../lib/UserContext.tsx";
import {useNavigate} from "react-router-dom";

function ProfilePage() {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null && !isAuthenticated) {
            navigate('/login');
        }
    }, [user, isAuthenticated]);

    const createSessionHandler = () => {
        navigate("/createSession");
    }

    return (
        <>
            <div className="profilePage" >
                <div className="profileMainHeader">
                    <h1>Welcome, {user?.name}</h1>
                    <p>{user?.email}</p>
                    {user?.roles.includes("ROLE_MENTOR") && <p className="role-badge">Mentor</p>}
                </div>
                <div className="profileContent">
                    <h1>About Me</h1>
                    <p>This is your profile dashboard. Here you can manage your sessions and account details.</p>
                </div>
                <div className="profileActions">
                    {user?.roles.includes("ROLE_MENTOR") && <button onClick={createSessionHandler}>Create New Session</button>}
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
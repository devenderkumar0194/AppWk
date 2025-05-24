import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import AxiosAPI from '../../Axios_Api';

const Head = (props) => {

    const { isAuthenticated,setIsAuthenticated, user, setUser} = useAuth();
    const navigate = useNavigate();
    
    const logout = async () => {

        await AxiosAPI.logout();
        setIsAuthenticated(false);
        navigate('/login', { state : { message : "Logout successfully"}});
    }
    return <>
        <header>
            <div className="nav">
            <Link to="/"><h1>TrackWise</h1></Link>
            <div className="nav-buttons">
                { !isAuthenticated && <div className="">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div> }

                { isAuthenticated && <div className="">

                    <button onClick={logout}>Logout</button>
                </div> }

            </div>
            </div>
            <div className="hero">
            <h2>{props.title? props.title : ""}</h2>
            <p>{props.subTitle? props.subTitle : "" }</p>
            </div>
        </header>
    
    </>;
}

export default Head;
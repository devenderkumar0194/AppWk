import { Link } from "react-router-dom";

const Head = (props) => {
    return <>
        <header>
            <div className="nav">
            <Link to="/"><h1>TrackWise</h1></Link>
            <div className="nav-buttons">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
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
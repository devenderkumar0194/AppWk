import { Link } from "react-router-dom";
import Head from "./Head";
import { useAuth } from "../../AuthContext";

const Wellcome = () => {

    const { isAuthenticated,setIsAuthenticated, user, setUser} = useAuth();

    return <>
        <main>

            <section>
            <div className="box-100">
                <h2 className="section-title">Welcome to TrackWise</h2>
                <p>Track your daily credits and debits with detailed notes. Always know how much money you have left and where it's going.</p>
            </div>
            </section>

    

            <section className="row">
            <div className="box-50">
                <h2 className="section-title">🔎 Real-Time Tracking</h2>
                <p>TrackWise instantly recalculates your balance as you enter new data. No calculator needed.</p>
            </div>
            <div className="box-50">
                <h2 className="section-title">📊 Financial Insights</h2>
                <p>Get a clear overview of your spending habits and savings goals. Make informed financial decisions.</p>
            </div>
            </section>


            <section className="row">
                <div className="box-70">
                    <h2 className="section-title">💡 Key Features</h2>
                    <ul>
                    <li>Add income or expenses with custom notes</li>
                    <li>Auto-update current balance</li>
                    <li>View transaction history anytime</li>
                    <li>Mobile-friendly design</li>
                    <li>Secure and private</li>
                    </ul>
                </div>
                <div className="box-30">
                    <h2 className="section-title">🚀 Fast & Easy</h2>
                    <p>Just enter an amount, choose credit or debit, and you're done. No complex setup or learning curve.</p>
                </div>
                </section>

                <section className="cta">
                <h2>👋 Get Started Today</h2>
                <p>Take charge of your money — it's free and always will be.</p>
                 
                 { isAuthenticated && (<Link to="/trns-list">Start Tracking Now</Link>) }
                 { !isAuthenticated && (<div className="wel-btn">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                 </div>) }
                 
                </section>

            </main>
    </>;
}

export default Wellcome;
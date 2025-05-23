import Head from "./Head";

const Login = () => {
    return <>
        <Head title="Please Log In to Continue" subTitle="Access your TrackWise dashboard to manage your credits, debits, and balance with ease."/>

        <main>

            <section>
            <div className="box-100">
            <form>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" placeholder="you@example.com" required />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="••••••••" required />
                </div>

                <button type="submit" class="login-btn">Log In</button>
                </form>


            
            
            </div>
            </section>

        </main>


    </>;
}

export default Login;
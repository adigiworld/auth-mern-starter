import React from "react";
import { Link } from "react-router-dom";
import { useToken } from "../auth/useToken";


const LogInPage = () => {
  const [token, setToken] = useToken();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errMessage, setErrMessage] = React.useState("");
  // const history=useHistory();
  const onLoginClicked = async () => {
    // const response = await fetch("http://localhost:8080/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Content-Length": "<calculated when request is sent>",
    //     "Host": "<calculated when request is sent>",
    //     "Connection": "keep-alive",
    //   },
    //   mode: "cors",
    //   body: JSON.stringify({ email: email, password: password }),
    // })
    // .then(res => { return res.data; }).catch(err => { console.error(err); });
    // const response = await axios.post("http://localhost:8080/api/signup", { email: email, password: password })
    const response = await axios({
      method: "POST",
      // url: "/api/login",
      url: "http://localhost:8080/api/login",
      data: { email: email, password: password }
    });
    // const response = await axios.post("/api/signup", { email: email, password: password })
    const { token } = response.data;
    setToken(token);

    <Navigate to={"/userinfo"} />
  }
  return (
    <main>
      <h1>Learning Auth LogIn Page</h1>
      {errMessage && <div className="text-red-700">{errMessage}</div>}
      <section className=" mx-auto mt-5 w-80 bg-gray-50 rounded-lg border overflow-hidden flex flex-col items-center">
        <header className="bg-icon w-full">
          <h2 className="text-xl text-link text-center py-2">Log In</h2>
        </header>
        <article className="py-5">
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="text-sm px-2 flex items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
                Email
              </label>
              <input value={email} onChange={e => setEmail(e.target.value)}
                type="email" placeholder="learning@gmail.com" id="email" className="rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-sm px-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                </svg>
                Password
              </label>
              <input value={password} onChange={e => setPassword(e.target.value)}
                type="password" placeholder="password" id="password" className="rounded" />
            </div>
            <div className="py-4 flex items-center justify-center">
              <button onClick={onLoginClicked} disabled={!email || !password}
                className={` text-link hover:text-link-hover hover:bg-icon-hover active:bg-icon bg-icon rounded-md flex items-center justify-center w-[125px] h-10 `}>
                Login
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 fill-link">
                  <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <aside><p>
              <Link to={"/forgot-password"} className="text-link ">Forgot your password?</Link><br />Don't have an account?
              <Link to={"/signup"} className="text-link">Join Now</Link></p>
            </aside>
          </form>
        </article>
      </section>
    </main>
  )
}

export default LogInPage;

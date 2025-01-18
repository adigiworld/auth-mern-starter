import { useState } from "react";
import { Layout } from "../components/layout";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const onForgotPasswordClicked = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8080/api/user/forgot-password/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
          "Host": "<calculated when request is sent>",
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive"
        },
      });
      console.log("Success");
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "login";
      }, 5000);
    } catch (err) {
      console.log("Failed");
      setSuccess(false);
      setErrMessage(e.message);
    }
  }

  return success ?
    (
      <main className=" mx-auto mt-5 w-80 bg-gray-50 rounded-lg border overflow-hidden flex flex-col items-center">
        <h1>Success!</h1>
        <p className=" py-5 text-center">Check your email to reset link.</p>
      </main>
    ) : (
      <Layout>
        <main>
          <h1>Learning Auth Forgot Password Page</h1>
          <p className=" pt-6 text-[20px] text-center">Enter your email and we'll send you a reset link</p>
          {errMessage && <div className="text-red-700">{errMessage}</div>}
          <section className=" mx-auto mt-5 w-80 bg-gray-50 rounded-lg border overflow-hidden flex flex-col items-center">
            <header className="bg-icon w-full">
              <h2 className="text-xl text-link text-center py-2">Forgot Password</h2>
            </header>
            <article className="py-5 w-full">
              <form>
                <div className="mb-4 px-5">
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
                <div className="py-4 flex items-center justify-center px-5">
                  <button onClick={onForgotPasswordClicked} disabled={!email}
                    className={` text-link hover:text-link-hover hover:bg-icon-hover active:bg-icon bg-icon rounded-md flex items-center justify-center w-full h-10 `}>
                    Forgot Password
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                      className="w-3 h-3 ml-3 fill-link">
                      <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </form>
            </article>
          </section>
        </main>
      </Layout>
    );
}

export default ForgotPasswordPage;

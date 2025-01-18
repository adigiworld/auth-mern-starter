import { useState } from "react";
import { Layout } from "../components/layout";
import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const { passwordResetCode } = useParams();

  const onResetPasswordClicked = async () => {
    try {
      await fetch(`http://localhost:8080/api/user/${passwordResetCode}/reset-password/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": "<calculated when request is sent>",
          "Host": "<calculated when request is sent>",
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive"
        },
        body: JSON.stringify({ newPassword: password })
      });
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "login";
      }, 5000);
    } catch (err) {
      setSuccess(false);
      setFailure(true);
    }

  }

  if (failure) {
    return (
      <main
        className=" mx-auto mt-5 w-96 bg-gray-50 rounded-lg border overflow-hidden flex flex-col align-middle items-center py-7">
        <h1>Fail Password Reset...</h1>
        <p className="px-4 py-3">Somthing went wrong while trying to reset your password.</p>
        <button onClick={() => window.location.href = "login"}
          className="text-link hover:text-link-hover hover:bg-icon-hover active:bg-icon bg-icon rounded-md flex items-center mt-4 justify-center px-3 h-10 "
        >Back to Login page</button>
      </main>
    )
  }
  if (success) {
    return (
      <main
        className=" mx-auto mt-5 w-96 bg-gray-50 rounded-lg border overflow-hidden flex flex-col align-middle items-center py-7"
      >
        <h1>Success!</h1>
        <p>Your password has been reset, Now please login with your new password.</p>
        <button onClick={() => window.location.href = "/login"}
          className="text-link hover:text-link-hover hover:bg-icon-hover active:bg-icon bg-icon rounded-md flex items-center mt-4 justify-center px-3 h-10 "
        >Got to Login page</button>
      </main>
    );
  }

  return (
    <Layout>
      <main>
        <h1>Learning Auth Reset Password Page</h1>
        <p className=" pt-6 text-[20px] text-center">Please enter your password</p>
        <section className=" mx-auto mt-5 w-80 bg-gray-50 rounded-lg border overflow-hidden flex flex-col items-center">
          <header className="bg-icon w-full">
            <h2 className="text-xl text-link text-center py-2">Reset Password</h2>
          </header>
          <article className="py-5 w-full">
            <form>
              <div className="mb-4 px-3">
                <label htmlFor="password" className="text-sm px-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                  </svg>
                  Password
                </label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" placeholder="password" className="rounded" />
              </div>
              <div className="mb-4 px-3">
                <label htmlFor="pwConfirm" className="text-sm px-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                  </svg>
                  Confirm Password
                </label>
                <input value={pwConfirm} onChange={e => setPwConfirm(e.target.value)}
                  type="password" id="pwConfirm" placeholder="confirm password" className="rounded" />
              </div>
              <div className="py-4 flex items-center justify-center px-5">
                <button onClick={onResetPasswordClicked} disabled={!password || !pwConfirm || password !== pwConfirm}
                  className={`${!password || !pwConfirm || password !== pwConfirm ? "disabled:bg-icon-hover " : ""} text-link hover:text-link-hover hover:bg-icon-hover active:bg-icon bg-icon rounded-md flex items-center justify-center w-full h-10 `}>
                  Reset Password
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

export default ResetPasswordPage;

import { useEffect, useState } from "react";
import { useToken } from "../auth/useToken";
import { useParams } from "react-router-dom";

const VerifyEmailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [, setToken] = useToken();
  const { verificationString } = useParams();
  // console.log(verificationString);
  useEffect(() => {
    const loadVerification = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/email/verify-email", {
          method: "PUT",
          headers: {
            // "Content-Type": "multipart/form-data",
            // "Content-Type": "text/plain",
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": "<calculated when request is sent>",
            "Host": "<calculated when request is sent>",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive"
          },
          // body: { verificationString }
          body: JSON.stringify({ verificationString: verificationString })
        });
        const { token } = await response.json();
        // console.log(token);
        setToken(token);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (err) {
        setIsSuccess(false);
        setIsLoading(false);
      }
    }
    loadVerification();
  }, [setToken, verificationString]);

  if (isLoading) { return <p>Loading...</p> }
  if (!isSuccess) {
    return (
      <main>
        <h1>Fail to Verify...</h1>
        <p>Somthing went wrong while trying to verify your email.</p>
        <button onClick={() => window.location.href = "/signup"}>Back to Signup page</button>
      </main>
    )
  }
  return (
    <main>
      <h1>Success!</h1>
      <p>Thanks for verifying your email</p>
      <button onClick={() => window.location.href = "/userinfo"}>Got to User Info page</button>
    </main>
  );
}

export default VerifyEmailPage;

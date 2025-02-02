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
      <main
        className=" mx-auto mt-5 w-96 bg-gray-50 rounded-lg border overflow-hidden flex flex-col align-middle items-center py-7">
        <h1>Fail to Verify...</h1>
        <p className="px-4 py-3">Somthing went wrong while trying to verify your email.</p>
        <button onClick={() => window.location.href = "/signup"}
          className="text-link hover:text-link-hover hover:bg-icon-hover active:bg-icon bg-icon rounded-md flex items-center mt-4 justify-center px-3 h-10 "
        >Back to Signup page</button>
      </main>
    )
  }
  return (
    <main
      className=" mx-auto mt-5 w-96 bg-gray-50 rounded-lg border overflow-hidden flex flex-col align-middle items-center py-7"
    >
      <h1>Success!</h1>
      <p>Thanks for verifying your email</p>
      <button onClick={() => window.location.href = "/userinfo"}
        className="text-link hover:text-link-hover hover:bg-icon-hover active:bg-icon bg-icon rounded-md flex items-center mt-4 justify-center px-3 h-10 "
      >Got to User Info page</button>
    </main>
  );
}

export default VerifyEmailPage;

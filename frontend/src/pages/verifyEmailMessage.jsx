import { useEffect } from "react";

const VerifyEmailMessagePage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/userinfo";
    }, 5000);
  }, []);
  return (
    <main>
      <h1>Thanks for Sining Up!</h1>
      <p>A verification email has been sent to your email address. Please verify your email to use all features.</p>
    </main>
  );
}

export default VerifyEmailMessagePage;

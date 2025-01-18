import { useEffect } from "react";

const VerifyEmailMessagePage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/userinfo";
    }, 5000);
  }, []);
  return (
    <main>
      <section
        className=" mx-auto mt-5 w-96 bg-gray-50 rounded-lg border overflow-hidden flex flex-col align-middle items-center">
        <h1>Thanks for Sining Up!</h1>
        <p className="text-[20px] py-3 mt-5">
          A verification email has been sent to your email address. Please verify your email to use all features.
        </p>
      </section>
    </main>
  );
}

export default VerifyEmailMessagePage;

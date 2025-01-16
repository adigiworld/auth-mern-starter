import { useEffect, useState } from "react";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import axios from "axios";

const UserInfoPage = () => {
  const user = useUser();
  const [token, setToken] = useToken();
  const { id, email, info } = user;
  const [name, setName] = useState(info.name || "");
  const [qualification, setQualofication] = useState(info.qualification || "");
  const [examStatus, setExamstatus] = useState(info.examStatus || "");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (successMessage || errorMessage) {
      setTimeout(() => {
        setSuccessMessage(false);
        setErrorMessage(false);
      }, 5000);
    }
  });
  const updateUserInfo = async () => {
    // e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          // "Content-Type": "application/json; charset=UTF-8",
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          // "Content-Type": "multipart/form-data",
          // "Content-Type": "text/plain",
          "Content-Length": "<calculated when request is sent>",

          "Host": "<calculated when request is sent>",
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive"
        },
        // mode: "cors",
        body: JSON.stringify({ name: name, qualification: qualification, examStatus: examStatus }),
      })
      const { token: newToken } = await response.json();
      setToken(newToken);
      // Show success Message
      setSuccessMessage(true);
    } catch (err) {
      console.log(err);
      // Show Error Message
      setErrorMessage(true);
    }
  }
  const logout = async () => {
    localStorage.removeItem("token");
    //send to login page
    window.location.href = "/login";
  }
  const reset = async (e) => {
    e.preventDefault();
    //reset user info
    setName(info.name);
    setQualofication(info.qualification);
    setExamstatus(info.examStatus);
  }

  return (
    <main>
      <h1>User Info Page</h1>
      <section>
        {successMessage && <div><p>Info updated successfully</p></div>}
        {errorMessage && <div><p>Info update failed</p></div>}
      </section>
      <section className=" mx-auto mt-5 w-80 bg-gray-50 rounded-lg border overflow-hidden flex flex-col items-center">
        <header className="bg-icon w-full">
          <h2 className="text-xl text-link text-center py-2">User {email}'s Info</h2>
        </header>
        <article className="py-5 px-3 w-full">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="text-sm px-2 flex items-center ">
                name
              </label>
              <input value={name} onChange={e => setName(e.target.value)}
                type="text" placeholder="name" id="name" className="rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="qualification" className="text-sm px-2 flex items-center">
                Qualification
              </label>
              <input value={qualification} onChange={e => setQualofication(e.target.value)}
                type="text" placeholder="Educational qualification" id="qualification" className="rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="examstatus" className="text-sm px-2 flex items-center">
                Exam status
              </label>
              <input value={examStatus} onChange={e => setExamstatus(e.target.value)}
                type="text" placeholder="Exam status" id="examstatus" className="rounded" />
            </div>
            <hr />
            <div className="mt-3 py-2 flex flex-col gap-4 items-center justify-center ">
              <button onClick={updateUserInfo}
                disabled={!name || !qualification || !examStatus}
                className={`${!name || !qualification || !examStatus ? "disabled:bg-icon-hover " : ""} text-link hover:text-link-hover hover:bg-icon-hover active:bg-icon bg-icon rounded-md flex items-center justify-center w-full h-10 `}>
                Update Info
              </button>
              <button onClick={reset}
                className={` text-link hover:text-link-hover hover:bg-icon-hover active:bg-icon bg-icon rounded-md flex items-center justify-center w-full h-10 `}>
                Reset Info
              </button>
              <button onClick={logout}
                className={` text-link hover:text-link-hover hover:bg-icon-hover active:bg-icon bg-icon rounded-md flex items-center justify-center w-full h-10 `}>
                Log Out
              </button>
            </div>
          </form>
        </article>
      </section>
    </main>
  )
}

export default UserInfoPage;

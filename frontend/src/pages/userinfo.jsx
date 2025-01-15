import { cache } from "react";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

const UserInfoPage = () => {
  const user = useUser();
  const [, setToken] = useToken();
  const { id, email, info } = user;

  const saveChanges = async () => {
    try {
      const response = "";
    } catch (err) {
      console.log(err);
    }
  }
  const logout = async () => {
    localStorage.removeItem("token");
    //send to login page
  }
  const reset = async () => {
    //reset user info
  }

  return (
    <main>
      <h1>User Info Page</h1>
    </main>
  )
}

export default UserInfoPage;

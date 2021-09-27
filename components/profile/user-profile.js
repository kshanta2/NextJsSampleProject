import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession, getSession } from "next-auth/client";
import { useEffect, useState } from "react";

function UserProfile() {
  // Redirect away if NOT auth
  /*cosnt[(isLoading, setIsLoading)] = useState(true);
  cosnt[(loadedSession, setLoadedSession)] = useState();
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.ref = "/auth";
      } else {
        setIsLoading(false);
      }
      //setLoadedSession(session);
    });
  }, []);

  //const [session, loading] = useSession();

  if (isLoading) {
    return <p className={classes.profile}>Loading...</p>;
  }*/
  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;

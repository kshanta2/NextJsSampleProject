import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredNewPassword = newPasswordRef.current.value;
    const enteredOldPassword = oldPasswordRef.current.value;

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });

    newPasswordRef.current.value = "";
    oldPasswordRef.current.value = "";
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

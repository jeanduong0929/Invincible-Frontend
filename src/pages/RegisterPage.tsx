import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SetAuthContext } from "../contexts/AuthProvider";
import INV_API from "../utils/AxiosConfig";

const RegisterPage = () => {
  const navigate = useNavigate();
  const setAuth = useContext(SetAuthContext);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [validUsername, setValidUsername] = useState<boolean>(true);
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [equalPassword, setEqualPassword] = useState<boolean>(true);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidUsername(username)) {
      error("Username needs to be 8-20 characters");
      setValidUsername(false);
      return;
    } else {
      setValidUsername(true);
    }

    if (!isValidPassword(password)) {
      error(
        "Password needs to be minimum 8-20 characters. 1 letter and 1 number"
      );
      setValidPassword(false);
      return;
    } else {
      setValidPassword(true);
    }

    if (password !== confirmPassword) {
      error("Passwords are not the same");
      setEqualPassword(false);
      return;
    } else {
      setEqualPassword(true);
    }

    const payload = {
      username: username,
      email: email,
      password1: password,
      password2: confirmPassword,
    };

    await INV_API.post("/auth/register", payload)
      .then((r) => {
        const auth = { ...r.data };
        window.sessionStorage.setItem("auth", JSON.stringify(auth));
        setAuth!(auth);
        success("Sign up successful");
        navigate("/");
      })
      .catch((e) => {
        if (e.response.status === 403) {
          const msg: string = e.response.data.message;
          const arr: string[] = msg.split(" ");
          if (arr[0] === "Username") {
            setValidUsername(false);
          }
          if (arr[0] === "Email") {
            setValidEmail(false);
          }
          error(e.response.data.message);
        }
      });
  };

  const isValidUsername = (username: string) => {
    return new RegExp(
      "^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
    ).test(username);
  };

  const isValidPassword = (password: string) => {
    return new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$").test(
      password
    );
  };

  const success = (msg: string) => {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const error = (msg: string) => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    /* Main */
    <div className="flex flex-col items-center | mt-40 mb-40">
      <form
        className="flex flex-col items-center | p-10 gap-10 | rounded-md shadow-xl"
        onSubmit={(e) => submit(e)}
      >
        <h1 className="font-mono font-bold text-4xl">REGISTER</h1>

        <input
          className={
            validUsername
              ? "bg-slate-200 | px-5 py-2 | rounded-md shadow-xl | ease-in-out duration-300 focus:scale-110 scale-100"
              : "bg-red-500 text-white | px-5 py-2 | rounded-md shadow-xl | ease-out duration-300 scale-110"
          }
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className={
            validEmail
              ? "bg-slate-200 | px-5 py-2 | rounded-md shadow-xl | ease-in-out duration-300 focus:scale-110 scale-100"
              : "bg-red-500 text-white | px-5 py-2 | rounded-md shadow-xl | ease-out duration-300 scale-110"
          }
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className={
            validPassword
              ? !equalPassword
                ? "bg-red-500 text-white | px-5 py-2 | rounded-md shadow-xl | ease-out duration-300 scale-110"
                : "bg-slate-200 | px-5 py-2 | rounded-md shadow-xl | ease-in-out duration-300 focus:scale-110 scale-100"
              : "bg-red-500 text-white | px-5 py-2 | rounded-md shadow-xl | ease-out duration-300 scale-110"
          }
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className={
            equalPassword
              ? "bg-slate-200 | px-5 py-2 | rounded-md shadow-xl | ease-in-out duration-300 focus:scale-110 scale-100"
              : "bg-red-500 text-white | px-5 py-2 | rounded-md shadow-xl | ease-out duration-300 scale-110"
          }
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="bg-cyan-900 text-white | px-5 py-2 | rounded-md shadow-xl | ease-out duration-300 hover:scale-110">
          Sign up
        </button>

        <Link
          to="/login"
          className="text-blue-500 font-mono | underline underline-offset-4 | ease-out duration-300 hover:scale-110"
        >
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;

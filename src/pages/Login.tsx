import { FormEvent, useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../models/Auth";
import INV_API from "../utils/AxiosConfig";
import { SetAuthContext } from "../contexts/AuthProvider";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setAuth = useContext(SetAuthContext);
  const navigate = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      username: username,
      password: password,
    };

    await INV_API.post("auth/login", payload)
      .then((r) => {
        const auth: Auth = { ...r.data };
        window.sessionStorage.setItem("auth", JSON.stringify(auth));
        setAuth!(auth);
        success();
        navigate("/");
      })
      .catch((e) => {
        if (e.response.status === 401) {
          error();
        }
      });
  };

  const success = () =>
    toast.success("Login success", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const error = () =>
    toast.error("Invalid username or password", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  return (
    <div className="flex flex-col items-center | mt-40">
      <form
        className="flex flex-col items-center | gap-10 p-10 | shadow-xl rounded-md"
        onSubmit={(e) => submit(e)}
      >
        <h1 className="font-bold font-mono  text-4xl">LOGIN</h1>
        <input
          className="bg-slate-200 | px-5 py-2 | rounded-md shadow-xl | ease-out duration-300 focus:scale-110"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="bg-slate-200 | px-5 py-2 | rounded-md shadow-xl | ease-out duration-300 focus:scale-110"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-cyan-900 font-mono text-white | px-5 py-2 | rounded-md shadow-xl | ease-out duration-300 hover:scale-110"
          type="submit"
        >
          Log in
        </button>
        <Link
          to="/register"
          className="font-mono text-blue-500 underline underline-offset-4"
        >
          Create an account
        </Link>
      </form>
    </div>
  );
};

export default Login;

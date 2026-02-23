import { useState } from "react";
import { loginAPI } from "../services/allApi";

function Login({ setUsername, setShowRegister }) {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const { email, password } = userData;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const result = await loginAPI(userData);

      if (result && result.username) {
        alert("Login Successful ");

        setUsername(result.username);

      } else {
        alert(result?.message || "Invalid credentials ");
      }

    } catch (err) {
      alert("Login Failed ");
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) =>
            setUserData({ ...userData, email: e.target.value })
          }
          className="w-full p-2 border rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          className="w-full p-2 border rounded-lg mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p
          onClick={() => setShowRegister(true)}
          className="text-sm text-center mt-4 text-indigo-600 cursor-pointer hover:underline"
        >
          Don't have account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;
import { useState } from "react";
import { registerAPI } from "../services/allApi";

function Register({ setShowRegister }) {

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const { username, email, password } = userData;

    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const result = await registerAPI(userData);

      if (result) {
        alert("Registration Successful ");
        setShowRegister(false); // go back to login
      }

    } catch (err) {
      alert("Registration Failed ");
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          className="w-full p-2 border rounded-lg mb-4"
        />

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
          onClick={handleRegister}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Register
        </button>

        <p
          onClick={() => setShowRegister(false)}
          className="text-sm text-center mt-4 text-indigo-600 cursor-pointer hover:underline"
        >
          Already have account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;
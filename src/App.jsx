import { useState } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ChatLayout from "./Components/ChatLayout";

function App() {
  const [username, setUsername] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {!username ? (
        showRegister ? (
          <Register setShowRegister={setShowRegister} />
        ) : (
          <Login 
            setUsername={setUsername}
            setShowRegister={setShowRegister}
          />
        )
      ) : (
        <ChatLayout username={username} />
      )}
    </>
  );
}

export default App;
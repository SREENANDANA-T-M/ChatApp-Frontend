import { useState, useEffect, useRef } from "react";
import socket from "../socket";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";

function ChatLayout({ username }) {

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notifications, setNotifications] = useState({});

  const selectedUserRef = useRef(null);

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  useEffect(() => {

    // Connect only once
    socket.connect();

    // Join room
    socket.emit("join", username);

    const handleOnlineUsers = (users) => {
      const filtered = users.filter(u => u !== username);
      setOnlineUsers(filtered);
    };

    const handleReceiveMessage = (data) => {

      console.log(" RECEIVED:", data);

      // If chat not open → show notification
      if (
        data.to === username &&
        data.from !== selectedUserRef.current
      ) {
        setNotifications(prev => ({
          ...prev,
          [data.from]: (prev[data.from] || 0) + 1
        }));
      }
    };

    socket.on("online_users", handleOnlineUsers);
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("online_users", handleOnlineUsers);
      socket.off("receive_message", handleReceiveMessage);
    };

  }, [username]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);

    // Clear notification
    setNotifications(prev => ({
      ...prev,
      [user]: 0
    }));
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <UserList
        onlineUsers={onlineUsers}
        selectedUser={selectedUser}
        setSelectedUser={handleSelectUser}
        notifications={notifications}
      />
      <ChatWindow
        username={username}
        selectedUser={selectedUser}
      />
    </div>
  );
}

export default ChatLayout;
import { useState, useEffect, useRef } from "react";
import socket from "../socket";
import { getMessagesAPI } from "../services/allApi";

function ChatWindow({ username, selectedUser }) {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [seen, setSeen] = useState(false);

  const bottomRef = useRef(null);

  //  Load previous messages
  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedUser) return;

      const result = await getMessagesAPI(username, selectedUser);
      if (result) setMessages(result);
    };

    loadMessages();
  }, [selectedUser, username]);

  //  SINGLE Real-time listener
  useEffect(() => {

    const handleReceive = (data) => {

      if (
        (data.from === username && data.to === selectedUser) ||
        (data.from === selectedUser && data.to === username)
      ) {
        setMessages(prev => [...prev, data]);
      }

    };

    const handleTyping = (user) => {
      if (user === selectedUser) {
        setTypingUser(user);
        setTimeout(() => setTypingUser(""), 2000);
      }
    };

    const handleSeen = () => {
      setSeen(true);
    };

    socket.on("receive_message", handleReceive);
    socket.on("show_typing", handleTyping);
    socket.on("message_seen", handleSeen);

    return () => {
      socket.off("receive_message", handleReceive);
      socket.off("show_typing", handleTyping);
      socket.off("message_seen", handleSeen);
    };

  }, [selectedUser, username]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {

    if (!selectedUser || !message.trim()) return;

    const newMessage = {
      from: username,
      to: selectedUser,
      message,
      timestamp: new Date()
    };

    socket.emit("private_message", newMessage);
    setMessage("");
    setSeen(false);
  };

  const handleTypingInput = (e) => {
    setMessage(e.target.value);

    socket.emit("typing", {
      from: username,
      to: selectedUser,
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">

      <div className="bg-indigo-600 text-white p-5 font-semibold shadow">
        {selectedUser
          ? ` ${selectedUser}`
          : "Select a user"}
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">

        {messages.map((msg, index) => {

          const isMine = msg.from === username;

          return (
            <div
              key={index}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-5 py-3 rounded-2xl max-w-xs shadow-md
                  ${isMine
                    ? "bg-indigo-600 text-white"
                    : "bg-white border"
                  }`}
              >
                <p>{msg.message}</p>

                <p className="text-xs opacity-70 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>

                {isMine && index === messages.length - 1 && (
                  <p className="text-xs text-right mt-1">
                    {seen ? "✓✓ Seen" : "✓ Sent"}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {typingUser && (
          <div className="text-sm text-gray-500 italic">
            {typingUser} is typing...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {selectedUser && (
        <div className="p-4 bg-white border-t flex gap-3">
          <input
            value={message}
            onChange={handleTypingInput}
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
            placeholder="Type a message..."
            className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>
      )}

    </div>
  );
}

export default ChatWindow;
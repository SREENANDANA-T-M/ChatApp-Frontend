function UserList({ onlineUsers, selectedUser, setSelectedUser, notifications }) {

  return (
    <div className="w-72 bg-white border-r shadow-lg">

      <div className="p-5 font-bold text-lg border-b">
        🟢 Online Users
      </div>

      {onlineUsers.map((user, index) => (

        <div
          key={index}
          onClick={() => setSelectedUser(user)}
          className={`p-4 cursor-pointer flex items-center justify-between hover:bg-indigo-50 transition
            ${selectedUser === user ? "bg-indigo-100" : ""}
          `}
        >

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              {user[0].toUpperCase()}
            </div>

            <div>
              <p className="font-medium">{user}</p>
              <p className="text-green-500 text-xs">Online</p>
            </div>

          </div>

          {notifications[user] > 0 && (
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {notifications[user]}
            </div>
          )}

        </div>
      ))}

    </div>
  );
}

export default UserList;
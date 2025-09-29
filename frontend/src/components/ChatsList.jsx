import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import avatarImage from "../assets/avatar.png"

function ChatsList() {
  const { getChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  useEffect(() => {
     getChatPartners();
  }, [ getChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/* online offline status */}
              <div className = {`avatar avatar-online`}>
              <div className="size-12 rounded-full overflow-hidden">
                <img className="size-full object-cover" src={chat.profilePic || avatarImage} alt={chat.fullName} />
              </div>
              </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ChatsList;
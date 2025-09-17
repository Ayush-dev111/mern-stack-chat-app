import React from 'react'
import { useChatStore } from '../store/useChatStore'
import AnimatedBorderContainer from '../components/AnimatedBorderContainer'
import ProfileHeader from '../components/ProfileHeader'
import ChatsList from '../components/ChatsList'
import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ContactList from '../components/ContactList'
import ChatContainer from '../components/ChatContainer'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder'
const ChatPage = () => {
  const {activeTab, selectedUser}= useChatStore();

  return (
      <div className="relative w-full max-w-6xl h-[600px]">
        <AnimatedBorderContainer>
          {/* left side bar */}
          <div className="w-80 bg-slate-800/50 backdrop-blue-sm flex flex-col">
            <ProfileHeader/>
            <ActiveTabSwitch/>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList/> : <ContactList/>}
            </div>
          </div>

          {/* right side */}
          <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer/> : <NoConversationPlaceholder/>}
          </div>
        </AnimatedBorderContainer>
      </div>

  )
}

export default ChatPage
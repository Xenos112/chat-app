"use client"
import { useState } from "react"
import { useChat } from "@/hooks/use-chat"
import { ChatSidebar } from "@/components/chat/chat-side-bar"
import { ChatHeader } from "@/components/chat/chat-header"
import { MessageList } from "@/components/chat/message-list"
import { MessageInput } from "@/components/chat/message-input"
import { EmptyState } from "@/components/chat/empty-state"

export default function ChatApp() {
  const { chats, activeChat, currentChat, setActiveChat, sendMessage, createNewChat } = useChat()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSendMessage = (message: string) => {
    if (activeChat) {
      sendMessage(activeChat, message)
    }
  }

  const handleNewChat = () => {
    const newChatId = createNewChat()
    setActiveChat(newChatId)
    setIsSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        onChatSelect={setActiveChat}
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            <ChatHeader chat={currentChat} onMenuToggle={() => setIsSidebarOpen(true)} />
            <MessageList messages={currentChat.messages} chatAvatar={currentChat.avatar} chatName={currentChat.name} />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

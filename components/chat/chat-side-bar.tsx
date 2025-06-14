"use client"
import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Chat } from "@/types/chat"
import { ChatListItem } from "./chat-list-item"

interface ChatSidebarProps {
  chats: Chat[]
  activeChat: string | null
  onChatSelect: (chatId: string) => void
  onNewChat: () => void
  isOpen: boolean
  onClose: () => void
}

export function ChatSidebar({ chats, activeChat, onChatSelect, onNewChat, isOpen, onClose }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleChatSelect = (chatId: string) => {
    onChatSelect(chatId)
    onClose()
  }

  return (
    <>
      <div
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative z-30 w-80 h-full bg-black/20 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-white">Messages</h1>
              <Button
                onClick={onNewChat}
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={activeChat === chat.id}
                onClick={() => handleChatSelect(chat.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onClose} />}
    </>
  )
}

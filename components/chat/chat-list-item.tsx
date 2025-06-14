"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Chat } from "@/types/chat"
import { formatLastSeen } from "@/lib/date-utils"

interface ChatListItemProps {
  chat: Chat
  isActive: boolean
  onClick: () => void
}

export function ChatListItem({ chat, isActive, onClick }: ChatListItemProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer transition-all duration-200 hover:bg-white/10 ${isActive ? "bg-white/20 border-r-2 border-purple-400" : ""
        }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarImage src={chat.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
              {chat.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white truncate">{chat.name}</h3>
            <span className="text-xs text-gray-400">{formatLastSeen(chat.timestamp)}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-300 truncate">{chat.lastMessage}</p>
            {chat.unread > 0 && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                {chat.unread}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

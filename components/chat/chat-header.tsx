"use client"
import { Phone, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Chat } from "@/types/chat"

interface ChatHeaderProps {
  chat: Chat
  onMenuToggle: () => void
}


export function ChatHeader({ chat, onMenuToggle }: ChatHeaderProps) {
  return (
    <div className="p-4 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onMenuToggle} className="lg:hidden text-white hover:bg-white/10">
            ☰
          </Button>
          <Avatar className="w-10 h-10">
            <AvatarImage src={chat.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
              {chat.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-white">{chat.name}</h2>
            <p className="text-sm text-green-400">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Phone className="size-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Video className="size-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <MoreVertical className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

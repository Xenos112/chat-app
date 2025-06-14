import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Message } from "@/types/chat"
import { formatTime } from "@/lib/date-utils"

interface MessageBubbleProps {
  message: Message
  chatAvatar?: string
  chatName?: string
}

export function MessageBubble({ message, chatAvatar, chatName }: MessageBubbleProps) {
  return (
    <div className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
      >
        {!message.isOwn && (
          <Avatar className="w-8 h-8">
            <AvatarImage src={chatAvatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs">
              {chatName
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={`px-4 py-2 rounded-2xl ${message.isOwn
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            : "bg-white/10 backdrop-blur-sm text-white"
            }`}
        >
          <p className="text-sm">{message.text}</p>
          <p className={`text-xs mt-1 ${message.isOwn ? "text-purple-100" : "text-gray-400"}`}>
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  )
}

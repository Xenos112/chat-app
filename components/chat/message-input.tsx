"use client"
import type React from "react"

import { useState } from "react"
import { Send, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MessageInputProps {
  onSendMessage: (message: string) => void
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (!message.trim()) return
    onSendMessage(message)
    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <div className="p-4 bg-black/20 backdrop-blur-xl border-t border-white/10">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
          <Smile className="size-5" />
        </Button>
        <div className="flex-1 relative">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 pr-12"
          />
          <Button
            onClick={handleSend}
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 h-8 w-8 p-0"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

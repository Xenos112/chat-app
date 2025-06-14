"use client"
import { useEffect, useRef } from "react"
import type { Message } from "@/types/chat"
import { MessageBubble } from "./message-bubble"

interface MessageListProps {
  messages: Message[]
  chatAvatar?: string
  chatName?: string
}

export function MessageList({ messages, chatAvatar, chatName }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} chatAvatar={chatAvatar} chatName={chatName} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

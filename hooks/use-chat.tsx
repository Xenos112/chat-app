"use client"

import { useState, useEffect } from "react"
import type { Chat, Message } from "@/types/chat"

const initialChats: Chat[] = [
  {
    id: "1",
    name: "Miamoto Musashi",
    avatar: "/musashi.png",
    lastMessage: "Hey! How are you doing?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: 2,
    messages: [
      {
        id: "1",
        text: "Hey there! How are you doing today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        isOwn: false,
        sender: "Miamoto Musashi",
      },
      {
        id: "2",
        text: "I'm doing great! Just working on some new projects. How about you?",
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        isOwn: true,
        sender: "You",
      },
      {
        id: "3",
        text: "That sounds interesting! I'd love to hear more about your projects.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        isOwn: false,
        sender: "Miamoto Musashi",
      },
    ],
  },
  {
    id: "2",
    name: "Guts",
    avatar: "/guts.png",
    lastMessage: "The meeting is at 3 PM",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unread: 0,
    messages: [
      {
        id: "1",
        text: "Don't forget about our meeting today",
        timestamp: new Date(Date.now() - 1000 * 60 * 35),
        isOwn: false,
        sender: "Guts",
      },
      {
        id: "2",
        text: "What time was it again?",
        timestamp: new Date(Date.now() - 1000 * 60 * 32),
        isOwn: true,
        sender: "You",
      },
      {
        id: "3",
        text: "The meeting is at 3 PM",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isOwn: false,
        sender: "Guts",
      },
    ],
  },
]

export function useChat() {
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chatApp-chats")
      if (saved) {
        const parsed = JSON.parse(saved)
        const transformed = parsed.map((chat: any) => ({
          ...chat,
          timestamp: new Date(chat.timestamp),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }))
        setChats(transformed)
        setActiveChat(transformed[0]?.id || null)
      } else {
        setChats(initialChats)
        setActiveChat(initialChats[0].id)
      }
    } catch (error) {
      setChats(initialChats)
      setActiveChat(initialChats[0].id)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever chats change
  useEffect(() => {
    if (isLoaded && chats.length > 0) {
      localStorage.setItem("chatApp-chats", JSON.stringify(chats))
    }
  }, [chats, isLoaded])

  const sendMessage = (chatId: string, text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isOwn: true,
      sender: "You",
    }

    // Add user message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, userMessage], lastMessage: text, timestamp: new Date() }
          : chat,
      ),
    )

    // Add response after delay - NO COMPLEX LOGIC
    setTimeout(() => {
      const responses = ["That's interesting!", "I agree!", "Tell me more.", "That sounds great!"]
      const response = responses[Math.floor(Math.random() * responses.length)]

      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === chatId) {
            const responseMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: response,
              timestamp: new Date(),
              isOwn: false,
              sender: chat.name,
            }
            return {
              ...chat,
              messages: [...chat.messages, responseMessage],
              lastMessage: response,
              timestamp: new Date(),
            }
          }
          return chat
        }),
      )
    }, 1500)
  }

  const createNewChat = () => {
    const names = ["Fang Yuan", "Michael Jackson"]
    const avatars = ["fang.png", "/mj.png"]
    const name = names[Math.floor(Math.random() * names.length)]
    const avatar = avatars[Math.floor(Math.random() * avatars.length)]

    const newChat: Chat = {
      id: Date.now().toString(),
      name,
      avatar,
      lastMessage: "Hey there!",
      timestamp: new Date(),
      unread: 0,
      messages: [
        {
          id: "1",
          text: "Hey there! Nice to meet you!",
          timestamp: new Date(),
          isOwn: false,
          sender: name,
        },
      ],
    }

    setChats((prev) => [newChat, ...prev])
    return newChat.id
  }

  const currentChat = chats.find((chat) => chat.id === activeChat) || null

  return {
    chats,
    activeChat,
    currentChat,
    setActiveChat,
    sendMessage,
    createNewChat,
    isLoaded,
  }
}

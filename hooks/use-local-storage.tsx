"use client"

import { useState, useEffect } from "react"
import type { Chat } from "@/types/chat"

function isChatArray(data: unknown): data is Chat[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.avatar === "string" &&
        typeof item.lastMessage === "string" &&
        typeof item.timestamp === "string" &&
        typeof item.unread === "number" &&
        Array.isArray(item.messages),
    )
  )
}

function transformChatData(data: unknown): Chat[] {
  if (!isChatArray(data)) {
    return []
  }

  return data.map((chat) => ({
    ...chat,
    timestamp: new Date(chat.timestamp),
    messages: chat.messages.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    })),
  }))
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key)
        if (item) {
          const parsed: unknown = JSON.parse(item)

          if (key === "chatApp-chats") {
            const transformedChats = transformChatData(parsed)
            setStoredValue(transformedChats as T)
          } else {
            setStoredValue(parsed as T)
          }
        }
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    } finally {
      setIsLoaded(true)
    }
  }, [key])

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  return [storedValue, setValue, isLoaded] as const
}

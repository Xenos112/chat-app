export interface Message {
  id: string
  text: string
  timestamp: Date
  isOwn: boolean
  avatar?: string
  sender: string
}

export interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: Date
  unread: number
  messages: Message[]
}

// Serialized versions for localStorage (with Date as string)
export interface SerializedMessage {
  id: string
  text: string
  timestamp: string
  isOwn: boolean
  avatar?: string
  sender: string
}

export interface SerializedChat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  messages: SerializedMessage[]
}

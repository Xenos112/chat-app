import { Send } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="size-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to Chat</h2>
        <p className="text-gray-400">Select a conversation to start messaging</p>
      </div>
    </div>
  )
}

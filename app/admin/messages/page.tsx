'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, Building, Calendar, Eye, EyeOff, Trash2 } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  timestamp: string
  read: boolean
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // 获取消息
  const fetchMessages = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('/api/contact')
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
      } else {
        setError('Failed to load messages from API')
        // 如果API失败，尝试从本地JSON文件读取
        try {
          const jsonResponse = await fetch('/data/contact-messages.json')
          if (jsonResponse.ok) {
            const localData = await jsonResponse.json()
            setMessages(localData || [])
          }
        } catch (jsonError) {
          console.log('Local JSON also failed')
        }
      }
    } catch (error) {
      console.error('Error loading messages:', error)
      setError('Network error - failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  // 标记为已读/未读
  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    // 这里可以添加API调用来更新状态
    // 目前只在前端更新
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: !currentStatus } : msg
    ))
  }

  // 删除消息
  const deleteMessage = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch('/api/contact', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        })
        
        if (response.ok) {
          // 删除成功后重新获取消息列表
          fetchMessages()
        } else {
          const errorData = await response.json()
          alert(`Failed to delete message: ${errorData.error || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error deleting message:', error)
        alert('Network error - failed to delete message')
      }
    }
  }

  // 格式化时间
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 获取未读消息数量
  const unreadCount = messages.filter(msg => !msg.read).length

  useEffect(() => {
    fetchMessages()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Contact Messages
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Total: {messages.length} messages • Unread: {unreadCount}
          </p>
          <button
            onClick={fetchMessages}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {messages.length === 0 ? (
        <div className="text-center py-12">
          <Mail size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-600">Contact form submissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`bg-white rounded-lg border ${
                message.read ? 'border-gray-200' : 'border-blue-200 bg-blue-50'
              } p-6`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {message.name}
                    </h3>
                    {!message.read && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{message.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReadStatus(message.id, message.read)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    title={message.read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {message.read ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    onClick={() => deleteMessage(message.id)}
                    className="p-2 text-gray-500 hover:text-red-600"
                    title="Delete message"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Mail size={16} className="mr-2" />
                  <a href={`mailto:${message.email}`} className="hover:text-black">
                    {message.email}
                  </a>
                </div>
                {message.phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <a href={`tel:${message.phone}`} className="hover:text-black">
                      {message.phone}
                    </a>
                  </div>
                )}
                {message.company && (
                  <div className="flex items-center text-gray-600">
                    <Building size={16} className="mr-2" />
                    <span>{message.company}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>{formatDate(message.timestamp)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Message:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-2">How to use:</h3>
        <ul className="text-gray-600 space-y-1">
          <li>• Messages are saved to <code className="bg-gray-100 px-1 rounded">data/contact-messages.json</code></li>
          <li>• Click the eye icon to mark messages as read/unread</li>
          <li>• Click the trash icon to delete messages</li>
          <li>• New messages are highlighted in blue</li>
          <li>• Click email/phone to contact the sender</li>
        </ul>
      </div>
    </div>
  )
}
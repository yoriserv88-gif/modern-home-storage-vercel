import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const messagesFilePath = path.join(process.cwd(), 'data', 'contact-messages.json')

// DELETE: 删除单个消息或所有消息
export async function DELETE(request: NextRequest) {
  try {
    // 验证管理员权限
    const authCookie = request.headers.get('cookie')?.includes('admin_auth=true')
    if (!authCookie) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { id } = await request.json()
    
    // 读取现有消息
    let messages = []
    try {
      const fileContent = await fs.readFile(messagesFilePath, 'utf-8')
      messages = JSON.parse(fileContent)
    } catch (error) {
      // 文件不存在，返回错误
      return NextResponse.json(
        { success: false, error: 'Messages file not found' },
        { status: 404 }
      )
    }
    
    // 如果提供了id，删除单个消息；否则清空所有消息
    if (id) {
      const initialLength = messages.length
      messages = messages.filter(msg => msg.id !== id)
      
      if (messages.length === initialLength) {
        return NextResponse.json(
          { success: false, error: 'Message not found' },
          { status: 404 }
        )
      }
    } else {
      messages = []
    }
    
    // 保存回文件
    await fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), 'utf-8')
    
    return NextResponse.json({ 
      success: true, 
      message: id ? 'Message deleted successfully' : 'All messages deleted successfully',
      messages
    })
  } catch (error) {
    console.error('Error deleting messages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete messages' },
      { status: 500 }
    )
  }
}

// GET: 获取所有消息
export async function GET(request: NextRequest) {
  try {
    // 读取JSON文件
    const fileContent = await fs.readFile(messagesFilePath, 'utf-8')
    const messages = JSON.parse(fileContent)
    
    return NextResponse.json({ 
      success: true, 
      messages 
    })
  } catch (error) {
    console.error('Error reading messages:', error)
    
    // 如果文件不存在，返回空数组
    return NextResponse.json({ 
      success: true, 
      messages: [] 
    })
  }
}

// POST: 创建新消息
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // 验证必需字段
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // 创建新消息
    const newMessage = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      company: data.company || '',
      subject: data.subject || 'General Inquiry',
      message: data.message,
      timestamp: new Date().toISOString(),
      read: false
    }
    
    // 读取现有消息
    let messages = []
    try {
      const fileContent = await fs.readFile(messagesFilePath, 'utf-8')
      messages = JSON.parse(fileContent)
    } catch (error) {
      // 文件不存在，创建新数组
      messages = []
    }
    
    // 添加新消息
    messages.unshift(newMessage)
    
    // 保存回文件
    await fs.writeFile(
      messagesFilePath, 
      JSON.stringify(messages, null, 2),
      'utf-8'
    )
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message saved successfully',
      data: newMessage
    })
  } catch (error) {
    console.error('Error saving message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save message' },
      { status: 500 }
    )
  }
}

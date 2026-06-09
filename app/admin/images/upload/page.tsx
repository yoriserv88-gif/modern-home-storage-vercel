'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Check, 
  AlertCircle,
  Home,
  FolderOpen
} from 'lucide-react'

type ModuleType = 'hero' | 'products' | 'factory' | 'partners' | 'other'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  preview: string
  module: ModuleType
  status: 'pending' | 'uploading' | 'success' | 'error'
  progress: number
}

export default function ImageUploadPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [selectedModule, setSelectedModule] = useState<ModuleType>('hero')
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]) // 保存原始File对象

  const modules = [
    { id: 'hero', name: 'Hero Banner', description: 'Main banner images for homepage' },
    { id: 'products', name: 'Products Gallery', description: 'Product showcase images' },
    { id: 'factory', name: 'Factory Images', description: 'Factory and manufacturing photos' },
    { id: 'partners', name: 'Partner Logos', description: 'Partner company logos' },
    { id: 'other', name: 'Other Images', description: 'Miscellaneous website images' },
  ]

  const handleFileSelect = (selectedFiles: FileList) => {
    const newFiles: UploadedFile[] = []
    const fileObjects: File[] = []
    
    Array.from(selectedFiles).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not an image`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const newFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          preview: e.target?.result as string,
          module: selectedModule,
          status: 'pending',
          progress: 0
        }
        
        setFiles(prev => [...prev, newFile])
        setSelectedFiles(prev => [...prev, file])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const removeFile = (id: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id)
      if (fileToRemove) {
        const index = selectedFiles.findIndex(f => f.name === fileToRemove.name && f.size === fileToRemove.size)
        if (index > -1) {
          const newSelectedFiles = [...selectedFiles]
          newSelectedFiles.splice(index, 1)
          setSelectedFiles(newSelectedFiles)
        }
      }
      return prev.filter(file => file.id !== id)
    })
  }

  const simulateUpload = (file: UploadedFile) => {
    return new Promise<void>((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, progress, status: 'uploading' } : f
        ))
        
        if (progress >= 100) {
          clearInterval(interval)
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'success' } : f
          ))
          resolve()
        }
      }, 200)
    })
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select files to upload')
      return
    }

    if (files.length !== selectedFiles.length) {
      alert('Please wait for previews to load')
      return
    }

    setUploading(true)
    
    try {
      const successfulUploads = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const originalFile = selectedFiles[i] // 获取原始File对象
        
        try {
          const formData = new FormData()
          formData.append('file', originalFile) // 使用原始File对象
          formData.append('module', file.module)
          formData.append('alt', file.name.replace(/\.[^/.]+$/, ""))
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })
          
          const result = await response.json()
          
          if (response.ok) {
            successfulUploads.push(result.data)
            setFiles(prev => prev.map(f => 
              f.id === file.id ? { ...f, status: 'success' } : f
            ))
          } else {
            setFiles(prev => prev.map(f => 
              f.id === file.id ? { ...f, status: 'error' } : f
            ))
            console.error(`Upload failed for ${file.name}:`, result.error)
          }
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error)
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'error' } : f
          ))
        }
      }
      
      if (successfulUploads.length > 0) {
        alert(`Successfully uploaded ${successfulUploads.length} image(s) to ${modules.find(m => m.id === selectedModule)?.name}`)
      }
      
      // 清空文件列表
      setFiles([])
      setSelectedFiles([])
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Check console for details.')
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="flex items-center text-gray-700 hover:text-black">
                <Home size={20} className="mr-2" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="font-medium text-black">Upload Images</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/images/manage"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <FolderOpen size={16} className="mr-2" />
                Manage Images
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Images</h1>
          <p className="text-gray-600">
            Upload images to different sections of your website. Supported formats: JPG, PNG, WebP
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Module Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Select Module</h2>
              <div className="space-y-3">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module.id as ModuleType)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedModule === module.id
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium mb-1">{module.name}</div>
                    <div className={`text-sm ${
                      selectedModule === module.id ? 'text-gray-200' : 'text-gray-600'
                    }`}>
                      {module.description}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Upload Guidelines</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Max file size: 5MB per image</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Recommended dimensions: 1920x1080 for banners</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Use WebP format for better compression</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Images will be optimized automatically</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - File Upload */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-black bg-black bg-opacity-5' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-gray-600" />
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drag & drop images here
                </h3>
                
                <p className="text-gray-600 mb-6">
                  or click to browse files from your computer
                </p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                />
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                >
                  Browse Files
                </button>
                
                <p className="text-sm text-gray-500 mt-4">
                  Selected module: <span className="font-medium">
                    {modules.find(m => m.id === selectedModule)?.name}
                  </span>
                </p>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Selected Files ({files.length})
                    </h3>
                    <button
                      onClick={() => setFiles([])}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Clear all
                    </button>
                  </div>

                  <div className="space-y-4">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4">
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900 truncate max-w-xs">
                                {file.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {formatFileSize(file.size)} • {file.type.split('/')[1].toUpperCase()}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          
                          {file.status === 'uploading' && (
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              ></div>
                            </div>
                          )}
                          
                          {file.status === 'success' && (
                            <div className="flex items-center text-green-600 text-sm">
                              <Check size={16} className="mr-1" />
                              Uploaded successfully
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end space-x-4">
                    <button
                      onClick={() => setFiles([])}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                      disabled={uploading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpload}
                      disabled={uploading || files.length === 0}
                      className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Uploading...
                        </div>
                      ) : (
                        `Upload ${files.length} image${files.length !== 1 ? 's' : ''}`
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Upload History */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Uploads</h3>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">No recent uploads</p>
                  <p className="text-sm text-gray-500">
                    Uploaded images will appear here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Image as ImageIcon, Upload, Trash2, Check, Edit, X } from 'lucide-react'

interface Banner {
  id: number
  title: string
  subtitle: string
  cta: string
  image: string
  bgColor: string
  order: number
}

export default function BannerAdminPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  // 从API获取横幅列表
  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners')
      if (response.ok) {
        const data = await response.json()
        setBanners(data.banners || [])
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  const handleUpload = async () => {
    if (!file || !editingBanner) return

    setUploading(true)
    
    try {
      // 首先上传图片
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bannerId', editingBanner.id.toString())
      formData.append('image', editingBanner.image)

      const uploadResponse = await fetch('/api/upload-banner', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json()
        alert(`Upload failed: ${errorData.error}`)
        setUploading(false)
        return
      }

      const uploadData = await uploadResponse.json()
      
      // 更新横幅配置
      const updatedBanner = {
        ...editingBanner,
        image: uploadData.data.url
      }

      try {
        const updateResponse = await fetch('/api/banners', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBanner),
        })

        if (updateResponse.ok) {
          alert('Banner uploaded and updated successfully!')
          setShowUploadModal(false)
          setEditingBanner(null)
          setFile(null)
          fetchBanners()
        } else {
          alert('Image uploaded but failed to update configuration')
        }
      } catch (updateError) {
        console.error('Update error:', updateError)
        alert('Upload successful but configuration update failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setShowUploadModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this banner?')) return

    try {
      const response = await fetch('/api/banners', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        fetchBanners()
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Delete failed')
    }
  }

  const handleUpdate = async (updatedBanner: Banner) => {
    try {
      const response = await fetch('/api/banners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBanner),
      })

      if (response.ok) {
        fetchBanners()
      }
    } catch (error) {
      console.error('Update error:', error)
      alert('Update failed')
    }
  }

  const handleOrderChange = (id: number, direction: 'up' | 'down') => {
    const index = banners.findIndex(b => b.id === id)
    if (index === -1) return

    const newBanners = [...banners]
    
    if (direction === 'up' && index > 0) {
      [newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]]
    } else if (direction === 'down' && index < newBanners.length - 1) {
      [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]]
    }

    // 更新order字段
    newBanners.forEach((banner, i) => {
      banner.order = i + 1
    })

    setBanners(newBanners)
    
    // 批量保存排序
    newBanners.forEach(banner => {
      handleUpdate(banner)
    })
  }

  const getBgColorClass = (color: string) => {
    switch (color) {
      case 'bg-gray-900': return 'bg-gray-900'
      case 'bg-gray-800': return 'bg-gray-800'
      default: return 'bg-gray-900'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading banners...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="flex items-center text-gray-700 hover:text-black mr-4">
                <ImageIcon size={20} className="mr-2" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="font-medium text-black">Manage Banners</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setEditingBanner({
                    id: banners.length + 1,
                    title: 'New Banner',
                    subtitle: 'Subtitle goes here',
                    cta: 'Learn More',
                    image: '/images/banners/new-banner.jpg',
                    bgColor: 'bg-gray-900',
                    order: banners.length + 1
                  })
                  setShowUploadModal(true)
                }}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
              >
                <Upload size={16} className="mr-2" />
                Add New Banner
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Banner Manager</h1>
          <p className="text-gray-600">
            Upload and manage hero section banners. Total: {banners.length} banners
          </p>
        </div>

        {banners.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No banners yet</h3>
            <p className="text-gray-600">Upload your first banner to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div key={banner.id} className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                <div className="relative h-48 bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  {banner.image && (
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{banner.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-1">{banner.subtitle}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>Image: {banner.image.split('/').pop()}</span>
                    <span className={`px-2 py-1 rounded ${getBgColorClass(banner.bgColor)} bg-opacity-20 text-black`}>
                      {banner.bgColor.replace('bg-', '')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
                    >
                      <Upload size={14} className="mr-1" />
                      Upload Image
                    </button>
                    
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleOrderChange(banner.id, 'up')}
                        disabled={banner.id === 1}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleOrderChange(banner.id, 'down')}
                        disabled={banner.id === banners.length}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && editingBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingBanner.id === banners.length + 1 ? 'Add New Banner' : 'Upload Banner Image'}
              </h3>
              <button
                onClick={() => {
                  setShowUploadModal(false)
                  setEditingBanner(null)
                  setFile(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Title
              </label>
              <input
                type="text"
                value={editingBanner.title}
                onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={editingBanner.subtitle}
                onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Call to Action
              </label>
              <input
                type="text"
                value={editingBanner.cta}
                onChange={(e) => setEditingBanner({ ...editingBanner, cta: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <select
                value={editingBanner.bgColor}
                onChange={(e) => setEditingBanner({ ...editingBanner, bgColor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="bg-gray-900">Dark Gray (bg-gray-900)</option>
                <option value="bg-gray-800">Medium Gray (bg-gray-800)</option>
                <option value="bg-black">Black (bg-black)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Image File
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowUploadModal(false)
                  setEditingBanner(null)
                  setFile(null)
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading || !file}
                className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

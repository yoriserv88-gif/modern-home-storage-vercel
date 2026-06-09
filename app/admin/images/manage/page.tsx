'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Image as ImageIcon, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  MoreVertical,
  Home,
  Upload
} from 'lucide-react'

interface WebsiteImage {
  id: string
  name: string
  url: string
  module: string
  size: string
  dimensions: string
  uploaded: string
  alt: string
}

export default function ImageManagePage() {
  const [search, setSearch] = useState('')
  const [filterModule, setFilterModule] = useState('all')
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  // 模拟数据
  const images: WebsiteImage[] = [
    {
      id: '1',
      name: 'hero-banner.jpg',
      url: '/images/hero-banner.jpg',
      module: 'Hero Banner',
      size: '2.4 MB',
      dimensions: '1920x1080',
      uploaded: '2024-01-15',
      alt: 'Modern home storage solutions'
    },
    {
      id: '2',
      name: 'product-1.jpg',
      url: '/images/product-1.jpg',
      module: 'Products',
      size: '1.8 MB',
      dimensions: '1200x800',
      uploaded: '2024-01-14',
      alt: 'Kitchen storage cabinet'
    },
    {
      id: '3',
      name: 'factory-showcase.jpg',
      url: '/images/factory-img/showcase.jpg',
      module: 'Factory',
      size: '3.2 MB',
      dimensions: '1600x900',
      uploaded: '2024-01-10',
      alt: 'Factory production line'
    },
    {
      id: '4',
      name: 'partner-logo-1.png',
      url: '/images/factory-img/partner1.jpg',
      module: 'Partners',
      size: '0.8 MB',
      dimensions: '400x200',
      uploaded: '2024-01-08',
      alt: 'Partner company logo'
    },
    {
      id: '5',
      name: 'product-2.jpg',
      url: '/images/product-2.jpg',
      module: 'Products',
      size: '2.1 MB',
      dimensions: '1200x800',
      uploaded: '2024-01-07',
      alt: 'Bathroom storage solution'
    },
    {
      id: '6',
      name: 'hero-banner-2.jpg',
      url: '/images/hero-banner-2.jpg',
      module: 'Hero Banner',
      size: '2.7 MB',
      dimensions: '1920x1080',
      uploaded: '2024-01-05',
      alt: 'Living room storage'
    },
  ]

  const modules = ['all', 'Hero Banner', 'Products', 'Factory', 'Partners', 'Other']

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(search.toLowerCase()) ||
                         image.alt.toLowerCase().includes(search.toLowerCase())
    const matchesModule = filterModule === 'all' || image.module === filterModule
    return matchesSearch && matchesModule
  })

  const toggleSelectImage = (id: string) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imageId => imageId !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredImages.map(img => img.id))
    }
  }

  const deleteSelected = () => {
    if (selectedImages.length === 0) return
    
    if (confirm(`Are you sure you want to delete ${selectedImages.length} image(s)?`)) {
      // 这里应该调用API删除图片
      alert(`${selectedImages.length} image(s) deleted (simulated)`)
      setSelectedImages([])
    }
  }

  const getModuleColor = (module: string) => {
    switch (module) {
      case 'Hero Banner': return 'bg-blue-100 text-blue-800'
      case 'Products': return 'bg-green-100 text-green-800'
      case 'Factory': return 'bg-purple-100 text-purple-800'
      case 'Partners': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
              <span className="font-medium text-black">Manage Images</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/images/upload"
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
              >
                <Upload size={16} className="mr-2" />
                Upload New
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Images</h1>
          <p className="text-gray-600">
            View, edit, and delete images across your website. Total: {images.length} images
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search images by name or description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Filter size={18} className="text-gray-400 mr-2" />
                <select
                  value={filterModule}
                  onChange={(e) => setFilterModule(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  {modules.map(module => (
                    <option key={module} value={module}>
                      {module === 'all' ? 'All Modules' : module}
                    </option>
                  ))}
                </select>
              </div>

              {selectedImages.length > 0 && (
                <button
                  onClick={deleteSelected}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete ({selectedImages.length})
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedImages.length === filteredImages.length && filteredImages.length > 0}
                onChange={selectAll}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Select all ({filteredImages.length} images)
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredImages.length} of {images.length} images
            </div>
          </div>
        </div>

        {/* Images Grid */}
        {filteredImages.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600 mb-6">
              {search ? 'Try a different search term' : 'Upload your first image to get started'}
            </p>
            <Link
              href="/admin/images/upload"
              className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800"
            >
              <Upload size={18} className="mr-2" />
              Upload Images
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                {/* Image Preview */}
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="absolute top-3 left-3">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => toggleSelectImage(image.id)}
                      className="h-5 w-5 text-black focus:ring-black border-gray-300 rounded"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="p-1 bg-white bg-opacity-80 rounded-md hover:bg-opacity-100">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* Image Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 truncate" title={image.name}>
                        {image.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate" title={image.alt}>
                        {image.alt}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Module:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModuleColor(image.module)}`}>
                        {image.module}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="font-medium">{image.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimensions:</span>
                      <span className="font-medium">{image.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uploaded:</span>
                      <span className="font-medium">{image.uploaded}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                    <button
                      onClick={() => alert(`Viewing ${image.name}`)}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                      title="Preview"
                    >
                      <Eye size={16} className="mr-1" />
                      <span className="text-sm">View</span>
                    </button>
                    
                    <button
                      onClick={() => alert(`Editing ${image.name}`)}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                      title="Edit"
                    >
                      <Edit size={16} className="mr-1" />
                      <span className="text-sm">Edit</span>
                    </button>
                    
                    <button
                      onClick={() => alert(`Downloading ${image.name}`)}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                      title="Download"
                    >
                      <Download size={16} className="mr-1" />
                      <span className="text-sm">Download</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${image.name}?`)) {
                          alert(`Deleted ${image.name} (simulated)`)
                        }
                      }}
                      className="flex items-center text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={16} className="mr-1" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-2xl font-bold text-gray-900">{images.length}</div>
            <div className="text-sm text-gray-600">Total Images</div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-2xl font-bold text-gray-900">12.5 MB</div>
            <div className="text-sm text-gray-600">Total Size</div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-sm text-gray-600">Modules</div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-2xl font-bold text-gray-900">45%</div>
            <div className="text-sm text-gray-600">Storage Used</div>
          </div>
        </div>

        {/* Module Breakdown */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Images by Module</h3>
          <div className="space-y-4">
            {modules.filter(m => m !== 'all').map(module => {
              const count = images.filter(img => img.module === module).length
              const percentage = Math.round((count / images.length) * 100)
              
              return (
                <div key={module} className="flex items-center">
                  <div className="w-32 text-sm font-medium text-gray-700">{module}</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getModuleColor(module).split(' ')[0]}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="ml-4 w-12 text-right text-sm font-medium">
                        {count} ({percentage}%)
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
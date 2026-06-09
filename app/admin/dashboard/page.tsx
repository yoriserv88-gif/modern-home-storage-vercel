'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Image, 
  Mail, 
  Upload, 
  Settings, 
  LogOut, 
  Home,
  Users,
  FileText,
  BarChart
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // 检查登录状态 - 使用cookies
    const cookies = document.cookie.split(';')
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('admin_auth='))
    const userCookie = cookies.find(cookie => cookie.trim().startsWith('admin_user='))
    
    if (!authCookie || authCookie.split('=')[1] !== 'true') {
      router.push('/admin/login')
    } else if (userCookie) {
      const email = decodeURIComponent(userCookie.split('=')[1])
      setUserEmail(email)
    }
  }, [router])

  const handleLogout = () => {
    // 清除认证cookies
    document.cookie = 'admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'admin_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/admin/login')
    router.refresh() // 刷新页面以清除认证状态
  }

  const stats = [
    { name: 'Total Images', value: '24', icon: Image, change: '+2', changeType: 'positive' },
    { name: 'Messages', value: '12', icon: Mail, change: '+3', changeType: 'positive' },
    { name: 'Website Visits', value: '1,234', icon: Users, change: '+12%', changeType: 'positive' },
    { name: 'Pages', value: '6', icon: FileText, change: '0', changeType: 'neutral' },
  ]

  const recentActivities = [
    { id: 1, action: 'Uploaded hero banner', user: 'Admin', time: '2 hours ago' },
    { id: 2, action: 'Updated product images', user: 'Admin', time: '1 day ago' },
    { id: 3, action: 'New contact message', user: 'John Doe', time: '2 days ago' },
    { id: 4, action: 'Updated about page', user: 'Admin', time: '3 days ago' },
  ]

  const websiteModules = [
    { name: 'Hero Banner', path: '/admin/images/manage?module=Hero Banner', imageCount: 3, lastUpdated: '2024-01-15' },
    { name: 'Products Gallery', path: '/admin/images/manage?module=Products', imageCount: 12, lastUpdated: '2024-01-14' },
    { name: 'Factory Images', path: '/admin/images/manage?module=Factory', imageCount: 5, lastUpdated: '2024-01-10' },
    { name: 'Partner Logos', path: '/admin/images/manage?module=Partners', imageCount: 4, lastUpdated: '2024-01-08' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-black text-white p-2 rounded-lg mr-3">
                <Home size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Modern Home Storage Website</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userEmail}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 
                          stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/admin/images/upload"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Upload className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Upload Images</h4>
                      <p className="text-sm text-gray-600">Add new images to website</p>
                    </div>
                  </Link>

                  <Link
                    href="/admin/messages"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">View Messages</h4>
                      <p className="text-sm text-gray-600">Check contact form submissions</p>
                    </div>
                  </Link>

                  <Link
                    href="/admin/images/manage"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <Image className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Manage Images</h4>
                      <p className="text-sm text-gray-600">Edit or delete existing images</p>
                    </div>
                  </Link>

                  <Link
                    href="/admin/settings"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                      <Settings className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Settings</h4>
                      <p className="text-sm text-gray-600">Configure website settings</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Website Modules */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Website Modules</h3>
                <p className="mt-1 text-sm text-gray-600">Manage images for different website sections</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {websiteModules.map((module) => (
                    <div key={module.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-3 rounded-lg mr-4">
                          <Image className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{module.name}</h4>
                          <p className="text-sm text-gray-600">
                            {module.imageCount} images • Updated {module.lastUpdated}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={module.path}
                        className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
                      >
                        Manage
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity */}
          <div>
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {recentActivities.map((activity, activityIdx) => (
                      <li key={activity.id}>
                        <div className="relative pb-8">
                          {activityIdx !== recentActivities.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                                <BarChart className="h-5 w-5 text-gray-500" />
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div>
                                <p className="text-sm text-gray-900">{activity.action}</p>
                                <p className="text-sm text-gray-500">by {activity.user}</p>
                              </div>
                              <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                {activity.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Link
                    href="/admin/activity"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View all activity
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 bg-white shadow rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Storage Usage</h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Images Storage</span>
                    <span>45% used</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="mb-2">• 24 images uploaded</p>
                  <p className="mb-2">• 12.5 MB total size</p>
                  <p>• Free plan: 100 MB limit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
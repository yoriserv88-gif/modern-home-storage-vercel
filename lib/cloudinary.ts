import { v2 as cloudinary } from 'cloudinary'

// 配置Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export interface UploadResult {
  success: boolean
  public_id?: string
  url?: string
  secure_url?: string
  format?: string
  width?: number
  height?: number
  bytes?: number
  error?: string
}

export interface UploadOptions {
  folder?: string
  public_id?: string
  overwrite?: boolean
  resource_type?: 'image' | 'video' | 'raw'
  transformation?: any[]
}

export const cloudinaryService = {
  // 上传图片
  async uploadImage(
    file: Buffer | string, 
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    try {
      const uploadOptions = {
        folder: options.folder || 'modern-home-storage',
        public_id: options.public_id,
        overwrite: options.overwrite || false,
        resource_type: options.resource_type || 'image',
        transformation: options.transformation
      }

      let result
      if (typeof file === 'string') {
        // 如果是Base64或URL
        result = await cloudinary.uploader.upload(file, uploadOptions)
      } else {
        // 如果是Buffer
        result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(file)
        })
      }

      return {
        success: true,
        public_id: result.public_id,
        url: result.url,
        secure_url: result.secure_url,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes
      }
    } catch (error: any) {
      console.error('Cloudinary上传错误:', error)
      return {
        success: false,
        error: error.message || '上传失败'
      }
    }
  },

  // 删除图片
  async deleteImage(publicId: string): Promise<{ success: boolean; error?: string }> {
    try {
      await cloudinary.uploader.destroy(publicId)
      return { success: true }
    } catch (error: any) {
      console.error('Cloudinary删除错误:', error)
      return {
        success: false,
        error: error.message || '删除失败'
      }
    }
  },

  // 获取图片信息
  async getImageInfo(publicId: string) {
    try {
      const result = await cloudinary.api.resource(publicId)
      return {
        success: true,
        public_id: result.public_id,
        url: result.url,
        secure_url: result.secure_url,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        created_at: result.created_at
      }
    } catch (error: any) {
      console.error('获取图片信息错误:', error)
      return {
        success: false,
        error: error.message || '获取信息失败'
      }
    }
  },

  // 生成图片URL（带转换）
  generateImageUrl(publicId: string, options: {
    width?: number
    height?: number
    crop?: string
    quality?: number
    format?: string
  } = {}) {
    const transformation = []
    
    if (options.width || options.height) {
      transformation.push({
        width: options.width,
        height: options.height,
        crop: options.crop || 'fill'
      })
    }
    
    if (options.quality) {
      transformation.push({ quality: options.quality })
    }
    
    if (options.format) {
      transformation.push({ format: options.format })
    }

    return cloudinary.url(publicId, {
      transformation,
      secure: true
    })
  },

  // 批量上传
  async uploadMultiple(
    files: Array<{ buffer: Buffer; originalname: string }>,
    folder: string = 'modern-home-storage'
  ) {
    const results = []
    
    for (const file of files) {
      const result = await this.uploadImage(file.buffer, {
        folder,
        public_id: file.originalname.replace(/\.[^/.]+$/, '') // 移除扩展名
      })
      results.push(result)
    }
    
    return results
  }
}

// 图片上传工具函数
export const imageUploadUtils = {
  // 验证图片文件
  validateImageFile(file: {
    originalname: string
    size: number
    mimetype: string
  }, maxSize: number = 5 * 1024 * 1024) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    
    if (!allowedTypes.includes(file.mimetype)) {
      return { valid: false, error: '不支持的文件格式' }
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: `文件大小超过限制 (最大 ${maxSize / 1024 / 1024}MB)` }
    }
    
    return { valid: true }
  },

  // 获取图片尺寸
  async getImageDimensions(buffer: Buffer): Promise<{ width: number; height: number }> {
    // 这里可以使用sharp库获取图片尺寸
    // 暂时返回默认值
    return { width: 1920, height: 1080 }
  },

  // 生成缩略图URL
  generateThumbnailUrl(publicId: string, width: number = 300, height: number = 200) {
    return cloudinaryService.generateImageUrl(publicId, {
      width,
      height,
      crop: 'fill',
      quality: 80
    })
  },

  // 优化图片URL
  generateOptimizedUrl(publicId: string, width?: number, quality: number = 85) {
    return cloudinaryService.generateImageUrl(publicId, {
      width,
      quality,
      format: 'webp'
    })
  }
}

export default cloudinaryService
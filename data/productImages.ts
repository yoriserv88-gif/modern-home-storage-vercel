import { Product } from './products'

export interface ProductWithImage {
  product: Product
  imageSrc: string
  alt: string
}

// 获取所有产品的图片数据
export const getAllProductImages = (): ProductWithImage[] => {
  const productImages: ProductWithImage[] = []
  
  // Kitchen products (8 images)
  for (let i = 1; i <= 8; i++) {
    productImages.push({
      product: {
        id: `kitchen-img-${i}`,
        title: `Kitchen Storage Product ${i}`,
        category: 'kitchen',
        description: 'Premium kitchen storage solution',
        features: ['Modern design', 'Durable material', 'Easy to install'],
        material: 'Stainless Steel',
        size: 'Various sizes',
        colors: ['Matte Black', 'Stainless Steel'],
        images: [`/images/kitchen&dining-img/kitchen-${i}.jpg`],
        isBestSeller: i <= 3
      },
      imageSrc: `/images/kitchen&dining-img/kitchen-${i}.jpg`,
      alt: `Kitchen Storage ${i}`
    })
  }
  
  // Bathroom products (6 images)
  for (let i = 1; i <= 6; i++) {
    productImages.push({
      product: {
        id: `bathroom-img-${i}`,
        title: `Bathroom Storage Product ${i}`,
        category: 'bathroom',
        description: 'Premium bathroom storage solution',
        features: ['Modern design', 'Rust-resistant', 'Easy to clean'],
        material: 'Powder Coated Steel',
        size: 'Various sizes',
        colors: ['Matte Black', 'Brushed Nickel'],
        images: [`/images/bathroom-img/bath-${i}.jpg`],
        isBestSeller: i <= 2
      },
      imageSrc: `/images/bathroom-img/bath-${i}.jpg`,
      alt: `Bathroom Storage ${i}`
    })
  }
  
  // Office products (8 images)
  for (let i = 1; i <= 8; i++) {
    productImages.push({
      product: {
        id: `office-img-${i}`,
        title: `Office Storage Product ${i}`,
        category: 'office',
        description: 'Premium office storage solution',
        features: ['Modern design', 'Space-saving', 'Cable management'],
        material: 'Metal Mesh + Steel',
        size: 'Various sizes',
        colors: ['Black', 'Gray'],
        images: [`/images/office-img/office-${i}.jpg`],
        isBestSeller: i <= 3
      },
      imageSrc: `/images/office-img/office-${i}.jpg`,
      alt: `Office Storage ${i}`
    })
  }
  
  // Living Room products (8 images)
  for (let i = 1; i <= 8; i++) {
    productImages.push({
      product: {
        id: `livingroom-img-${i}`,
        title: `Living Room Storage Product ${i}`,
        category: 'living-room',
        description: 'Premium living room storage solution',
        features: ['Modern design', 'Floating style', 'Easy installation'],
        material: 'Wood + Metal',
        size: 'Various sizes',
        colors: ['Walnut', 'Black'],
        images: [`/images/livingroom-img/living-${i}.jpg`],
        isBestSeller: i <= 3
      },
      imageSrc: `/images/livingroom-img/living-${i}.jpg`,
      alt: `Living Room Storage ${i}`
    })
  }
  
  return productImages
}

// 分页获取产品图片
export const getPaginatedProductImages = (page: number = 1, itemsPerPage: number = 16) => {
  const allProducts = getAllProductImages()
  const totalItems = allProducts.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  
  const paginatedProducts = allProducts.slice(startIndex, endIndex)
  
  return {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  }
}
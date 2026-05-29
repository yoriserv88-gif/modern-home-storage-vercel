export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  material: string;
  size: string;
  colors: string[];
  images: string[];
  isBestSeller: boolean;
}

export const products: Product[] = [
  {
    id: "ks-001",
    title: "Expandable Kitchen Dish Drying Rack",
    category: "kitchen",
    description: "Metal over sink dish drainer for countertop with adjustable size",
    features: [
      "Modern minimalist style fits all home decoration",
      "Sturdy metal structure, long service life",
      "Space-saving & multi-functional design",
      "Easy installation & no drilling optional",
      "Anti-rust & smooth surface for daily use"
    ],
    material: "Stainless Steel + PP Plastic",
    size: "Adjustable: 15-24 inches",
    colors: ["Matte Black", "Stainless Steel", "White"],
    images: ["/images/product-1.jpg", "/images/product-2.jpg"],
    isBestSeller: true
  },
  {
    id: "ks-002",
    title: "360 Rotating Lazy Susan Turntable",
    category: "kitchen",
    description: "Storage organizer for kitchen cabinet with smooth rotation",
    features: [
      "360° smooth rotation for easy access",
      "Heavy-duty metal bearing system",
      "Space optimization for corner cabinets",
      "Easy to clean and maintain",
      "Modern minimalist design"
    ],
    material: "MDF Wood + Metal Bearing",
    size: "12 inch diameter",
    colors: ["Walnut", "Oak", "Black"],
    images: ["/images/product-3.jpg", "/images/product-4.jpg"],
    isBestSeller: true
  },
  {
    id: "bs-001",
    title: "Wall Mounted Towel Rack",
    category: "bathroom",
    description: "Modern metal bathroom storage holder with multiple bars",
    features: [
      "Sleek wall-mounted design",
      "Multiple towel bars for organization",
      "Rust-resistant metal finish",
      "Easy installation with included hardware",
      "Modern minimalist aesthetic"
    ],
    material: "Powder Coated Steel",
    size: "24 x 6 x 3 inches",
    colors: ["Matte Black", "Brushed Nickel", "Chrome"],
    images: ["/images/product-5.jpg", "/images/product-6.jpg"],
    isBestSeller: true
  },
  {
    id: "os-001",
    title: "Metal Desk Organizer",
    category: "office",
    description: "Multi-functional desktop storage rack for home office",
    features: [
      "All-in-one desk organization",
      "Multiple compartments for supplies",
      "Sturdy metal construction",
      "Modern industrial design",
      "Space-efficient footprint"
    ],
    material: "Metal Mesh + Steel Frame",
    size: "12 x 8 x 6 inches",
    colors: ["Black", "Gray", "White"],
    images: ["/images/product-7.jpg", "/images/product-8.jpg"],
    isBestSeller: true
  },
  {
    id: "os-002",
    title: "Under Desk Cable Management Tray",
    category: "office",
    description: "No drill metal wire cord organizer for clean workspace",
    features: [
      "No-drill installation with adhesive",
      "Holds multiple cables securely",
      "Metal construction for durability",
      "Hidden cable management",
      "Easy access to cables"
    ],
    material: "Steel with Rubber Padding",
    size: "18 x 4 x 2 inches",
    colors: ["Black", "White"],
    images: ["/images/product-9.jpg", "/images/product-10.jpg"],
    isBestSeller: false
  },
  {
    id: "ls-001",
    title: "Modern Floating Shelf",
    category: "living-room",
    description: "Wall mount storage rack for living room & bedroom",
    features: [
      "Floating design for modern look",
      "Hidden mounting system",
      "Sturdy metal brackets",
      "Multiple size options",
      "Easy to install"
    ],
    material: "Solid Wood + Metal Brackets",
    size: "24 x 8 x 1.5 inches",
    colors: ["Walnut", "Oak", "Black", "White"],
    images: ["/images/product-11.jpg", "/images/product-12.jpg"],
    isBestSeller: true
  }
];

export const bestSellers = products.filter(product => product.isBestSeller);

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};
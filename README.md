# Modern Home Storage Website

A modern, responsive website for a home storage products manufacturer targeting the US market. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **100% Responsive Design**: Perfectly adapted for PC, tablet, and mobile devices
- **Modern Minimalist Design**: Black, white, and gray color scheme with clean typography
- **SEO Optimized**: Proper meta tags, structured data, and fast loading
- **Social Media Ready**: Optimized for Facebook/Instagram ad landing pages
- **Inquiry System**: Built-in contact forms and quote requests
- **Product Showcase**: Beautiful product displays with filtering capabilities
- **Factory/Brand Showcase**: Professional presentation of manufacturing capabilities

## Pages

1. **Homepage** - Hero banner, product categories, best sellers, brand advantages
2. **Products** - Product listing with filtering by category
3. **Product Detail** - Detailed product information with images and specifications
4. **About Us** - Company story, values, and manufacturing capabilities
5. **Services** - OEM/ODM, samples, FBA shipping, bulk orders
6. **Contact** - Inquiry form with multiple contact options

## Design Specifications

- **Primary Colors**: White (#FFFFFF), Matte Black (#1A1A1A), Dark Gray (#4A4A4A)
- **Fonts**: Inter (primary), Roboto (secondary)
- **Design Style**: Modern, Minimalist, Premium
- **Target Audience**: US homeowners, Amazon sellers, retailers, wholesalers

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
modern-home-storage-website/
├── app/                    # Next.js app router pages
│   ├── about/             # About us page
│   ├── contact/           # Contact page
│   ├── products/          # Products listing and detail pages
│   ├── service/           # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Footer
│   ├── Hero.tsx          # Hero banner
│   ├── Products.tsx      # Product showcase
│   └── ...               # Other components
├── data/                  # Static data
│   ├── content.ts        # Site content and configuration
│   └── products.ts       # Product data
├── public/               # Static assets
│   └── images/          # Image files
└── ...                   # Configuration files
```

## Customization

### Content Updates
- Update `data/content.ts` for site-wide content
- Update `data/products.ts` for product information
- Update `app/layout.tsx` for meta tags and site configuration

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles

### Images
Place product and banner images in `public/images/` directory

## Deployment

Build the project for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Features for Social Media Optimization

- Fast loading times for better ad performance
- Clean, uncluttered design for better conversion
- Mobile-first responsive design
- Clear call-to-action buttons
- Social sharing buttons
- SEO-friendly URLs and meta tags

## License

This project is created for demonstration purposes.
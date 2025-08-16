# AI Company Website

A modern, responsive website for an AI company built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with beautiful gradients
- 📱 Mobile-first approach with mobile menu
- ⚡ Fast performance with Next.js 14
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🔧 shadcn/ui components
- 🌙 Dark mode support (CSS variables ready)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **UI Library**: Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-company-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── components/
│   │   └── ui/
│   │       ├── dialog.tsx       # Dialog component
│   │       └── hero-1.tsx       # Hero landing component
│   └── lib/
│       └── utils.ts             # Utility functions
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Customization

### Hero Component

The hero component is highly customizable through props:

```typescript
const heroProps: HeroLandingProps = {
  // Logo and branding
  logo: {
    src: "your-logo.svg",
    alt: "Your Company Logo",
    companyName: "Your Company"
  },
  
  // Navigation
  navigation: [
    { name: 'Product', href: '/product' },
    { name: 'Features', href: '/features' },
  ],
  
  // Hero content
  title: "Your Hero Title",
  description: "Your hero description",
  
  // Styling
  titleSize: "large", // 'small' | 'medium' | 'large'
  gradientColors: {
    from: "oklch(0.7 0.15 280)",
    to: "oklch(0.6 0.2 320)"
  }
}
```

### Colors and Theme

The project uses CSS variables for theming. You can customize colors in `src/app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... more variables */
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The project can be deployed to Vercel, Netlify, or any other platform that supports Next.js.

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details. 
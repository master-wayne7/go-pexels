# Pexels Gallery Frontend

A beautiful, responsive React frontend for the Go Pexels API backend. Built with TypeScript, modern UI components, and responsive design.

## 🎨 Features

- **Modern UI**: Clean, gradient-based design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Masonry Layout**: Beautiful Pinterest-style photo and video galleries
- **Search Functionality**: Search for photos and videos
- **Multiple Modes**: Browse curated/popular content, search, or get random items
- **Modal Views**: Full-screen photo and video viewing
- **Download Support**: Direct download links for photos and videos
- **TypeScript**: Full type safety and excellent developer experience

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Go backend running on `http://localhost:8080`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

## 🛠️ Development

The frontend will automatically proxy API requests to `http://localhost:8080` when running in development mode.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # React components
│   │   ├── PhotoGallery.tsx    # Photo gallery with masonry layout
│   │   ├── VideoGallery.tsx    # Video gallery with masonry layout
│   │   ├── PhotoModal.tsx      # Full-screen photo viewer
│   │   └── VideoModal.tsx      # Full-screen video viewer
│   ├── services/           # API services
│   │   └── api.ts              # Backend API integration
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts            # Data models matching Go backend
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # React app entry point
│   └── index.css           # Global styles and responsive design
├── package.json            # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🎨 UI Components

### PhotoGallery
- Masonry layout for optimal space usage
- Hover effects and smooth transitions
- Download and view original buttons
- Click to open in modal

### VideoGallery
- Video thumbnails with duration overlay
- Play button overlay on hover
- Video information display
- Full-screen video playback in modal

### Modals
- Full-screen photo/video viewing
- Download functionality
- Photographer/creator attribution
- Keyboard and click-to-close support

## 📱 Responsive Design

The frontend is fully responsive with breakpoints:
- **Desktop**: 4-column masonry layout
- **Large tablets**: 3-column layout
- **Small tablets**: 2-column layout
- **Mobile**: Single-column layout

## 🎯 API Integration

The frontend integrates with all backend endpoints:

### Photo Endpoints
- Search photos
- Get curated photos
- Get specific photo by ID
- Get random photo

### Video Endpoints
- Search videos
- Get popular videos
- Get random video

### Utility Endpoints
- API info and rate limiting
- Health check

## 🎨 Design System

### Colors
- Primary: `#667eea` (Blue gradient start)
- Secondary: `#764ba2` (Purple gradient end)
- Success: `#10b981` (Green for download buttons)
- Info: `#3b82f6` (Blue for view buttons)
- Error: `#c53030` (Red for error messages)

### Typography
- Font Family: Inter (Google Fonts)
- Modern, clean, and highly readable

### Animations
- Smooth hover effects
- Card lift animations
- Gradient button effects
- Modal transitions

## 🔧 Configuration

The frontend automatically detects the environment:
- **Development**: Proxies to `http://localhost:8080`
- **Production**: Uses the same domain as the frontend

## 📦 Dependencies

### Core
- React 18.2.0
- TypeScript 5.0.0
- React Router DOM 6.15.0

### UI & Icons
- Lucide React (Modern icon library)
- React Masonry CSS (Pinterest-style layouts)

### HTTP Client
- Axios (API requests with interceptors)

## 🚀 Deployment

To build for production:

```bash
npm run build
```

This creates a `build` folder with optimized production files ready for deployment.

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for all new components
3. Ensure responsive design
4. Add proper error handling
5. Test across different screen sizes 
# 🎨 Pexels Gallery - Full-Stack Application

A beautiful, modern full-stack web application for browsing and downloading photos and videos from Pexels. Built with Go (Gin) backend and React TypeScript frontend.

![Pexels Gallery](https://via.placeholder.com/800x400/667eea/ffffff?text=Pexels+Gallery)

## 🌟 Features

### 📸 Photo Gallery
- **Search Photos**: Find photos by keywords
- **Curated Photos**: Browse hand-picked quality photos
- **Random Photos**: Discover random beautiful photos
- **Full-Screen Viewing**: Modal view for detailed photo inspection
- **Direct Downloads**: One-click photo downloads in multiple resolutions

### 🎬 Video Gallery
- **Search Videos**: Find videos by keywords
- **Popular Videos**: Browse trending and popular videos
- **Random Videos**: Discover random engaging videos
- **Video Playback**: Full-screen video player with controls
- **Multiple Qualities**: Download videos in different resolutions

### 🎯 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Masonry Layout**: Pinterest-style grid layout for optimal space usage
- **Modern UI**: Clean gradient design with smooth animations
- **Fast Performance**: Optimized API calls and image loading
- **Rate Limiting**: Real-time API quota monitoring

## 🏗️ Architecture

```
go-pexels/
├── backend/           # Go (Gin) REST API
│   ├── cmd/server/    # Application entry point
│   ├── internal/      # Private application code
│   │   ├── api/       # HTTP handlers and routes
│   │   ├── client/    # Pexels API client
│   │   └── models/    # Data structures
│   └── go.mod         # Go dependencies
├── frontend/          # React TypeScript SPA
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API integration
│   │   ├── types/         # TypeScript definitions
│   │   └── App.tsx        # Main application
│   └── package.json       # Node dependencies
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- **Go**: 1.21 or higher
- **Node.js**: 16 or higher
- **Pexels API Key**: Get from [Pexels API](https://www.pexels.com/api/)

### 1. Clone & Setup

```bash
git clone <repository-url>
cd go-pexels
```

### 2. Backend Setup

```bash
cd backend

# Create environment file
echo "PEXELS_API_KEY=your_pexels_api_key_here" > .env
echo "PORT=8080" >> .env

# Install dependencies
go mod tidy

# Run the backend
go run cmd/server/main.go
```

Backend will start at: `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will start at: `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to `http://localhost:3000`

## 📊 API Endpoints

### Photo Endpoints
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/photos/search` | Search photos | `query`, `page`, `per_page` |
| GET | `/photos/curated` | Get curated photos | `page`, `per_page` |
| GET | `/photos/:id` | Get specific photo | `id` |
| GET | `/photos/random` | Get random photo | None |

### Video Endpoints
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/videos/search` | Search videos | `query`, `page`, `per_page` |
| GET | `/videos/popular` | Get popular videos | `page`, `per_page` |
| GET | `/videos/random` | Get random video | None |

### Utility Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/info` | API info and rate limits |
| GET | `/health` | Health check |

## 🛠️ Technology Stack

### Backend
- **Language**: Go 1.21+
- **Framework**: Gin Web Framework
- **HTTP Client**: Native Go net/http
- **Environment**: godotenv for config
- **Architecture**: Clean Architecture principles

### Frontend
- **Language**: TypeScript 4.9+
- **Framework**: React 18
- **Build Tool**: Create React App
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Layout**: React Masonry CSS
- **Styling**: CSS3 with modern features

## 🎨 Design System

### Color Palette
- **Primary Gradient**: `#667eea` → `#764ba2`
- **Success**: `#10b981` (Download buttons)
- **Info**: `#3b82f6` (View buttons)
- **Error**: `#c53030` (Error messages)
- **Background**: Gradient + White cards

### Typography
- **Font Family**: Inter (Google Fonts)
- **Hierarchy**: Clear heading and body text scales
- **Accessibility**: High contrast ratios

### Components
- **Cards**: Elevated with shadows and hover effects
- **Buttons**: Gradient backgrounds with hover animations
- **Modals**: Full-screen overlays with backdrop blur
- **Grid**: Responsive masonry layout

## 📱 Responsive Breakpoints

| Device | Width | Columns |
|--------|-------|---------|
| Desktop | 1400+ | 4 columns |
| Large Tablet | 900-1399 | 3 columns |
| Small Tablet | 600-899 | 2 columns |
| Mobile | <600 | 1 column |

## 🔧 Development

### Backend Development

```bash
cd backend

# Run with hot reload (requires air)
go install github.com/cosmtrek/air@latest
air

# Run tests
go test ./...

# Build for production
go build -o bin/server cmd/server/main.go
```

### Frontend Development

```bash
cd frontend

# Development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Type checking
npx tsc --noEmit
```

## 🔒 Environment Variables

### Backend (.env)
```env
PEXELS_API_KEY=your_pexels_api_key_here
PORT=8080
```

### Frontend
The frontend automatically proxies to `http://localhost:8080` in development.

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
go build -o pexels-api cmd/server/main.go
./pexels-api
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the 'build' folder to your hosting service
```

## 🐛 Troubleshooting

### Common Issues

**CORS Errors**
- Ensure backend is running on port 8080
- Check if CORS middleware is properly configured

**API Rate Limits**
- Monitor the rate limit display in the UI
- Wait for rate limits to reset

**Images Not Loading**
- Check network connectivity
- Verify Pexels API key is valid

**TypeScript Errors**
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript version compatibility

## 📈 Performance Optimizations

### Backend
- **Timeout Handling**: 10-second timeout for API requests
- **Error Handling**: Graceful error responses
- **Rate Limiting**: Built-in Pexels API rate limit monitoring

### Frontend
- **Lazy Loading**: Images load as they come into view
- **Code Splitting**: Automatic code splitting with React
- **Caching**: Browser caching for static assets
- **Optimized Builds**: Minified production builds

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow Go conventions for backend code
- Use TypeScript for all frontend code
- Maintain responsive design principles
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ using Go and React** 
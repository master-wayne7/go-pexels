package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/master-wayne7/go-pexels/internal/api"
	"github.com/master-wayne7/go-pexels/internal/client"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get API key from environment
	apiKey := os.Getenv("PEXELS_API_KEY")
	if apiKey == "" {
		log.Fatal("PEXELS_API_KEY not found in environment variables")
	}

	// Initialize Pexels client
	pexelsClient := client.NewClient(apiKey)

	// Initialize Gin router
	r := gin.Default()

	// Initialize handlers
	handlers := api.NewHandlers(pexelsClient)

	// Setup routes
	handlers.SetupRoutes(r)

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Print startup information
	fmt.Printf("🚀 Starting Pexels API server on port %s...\n", port)
	fmt.Println("📝 Available endpoints:")
	fmt.Println("   GET /photos/search?query=nature&page=1&per_page=10")
	fmt.Println("   GET /photos/curated?page=1&per_page=10")
	fmt.Println("   GET /photos/:id")
	fmt.Println("   GET /photos/random")
	fmt.Println("   GET /videos/search?query=nature&page=1&per_page=10")
	fmt.Println("   GET /videos/popular?page=1&per_page=10")
	fmt.Println("   GET /videos/random")
	fmt.Println("   GET /info")
	fmt.Println("   GET /health")
	fmt.Printf("🌐 Server running at http://localhost:%s\n", port)

	// Start server
	log.Fatal(r.Run(":" + port))
}

package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/master-wayne7/go-pexels/internal/client"
)

// Handlers contains all the HTTP handlers and dependencies
type Handlers struct {
	PexelsClient *client.Client
}

// NewHandlers creates a new Handlers instance
func NewHandlers(pexelsClient *client.Client) *Handlers {
	return &Handlers{
		PexelsClient: pexelsClient,
	}
}

// SetupRoutes configures all the API routes
func (h *Handlers) SetupRoutes(r *gin.Engine) {
	// Add CORS middleware
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Header("Content-Type", "application/json")
		c.Next()
	})

	// Photo endpoints
	r.GET("/photos/search", h.SearchPhotos)
	r.GET("/photos/curated", h.CuratedPhotos)
	r.GET("/photos/:id", h.GetPhoto)
	r.GET("/photos/random", h.GetRandomPhoto)

	// Video endpoints
	r.GET("/videos/search", h.SearchVideos)
	r.GET("/videos/popular", h.PopularVideos)
	r.GET("/videos/random", h.GetRandomVideo)

	// Utility endpoints
	r.GET("/info", h.GetInfo)
	r.GET("/health", h.HealthCheck)
}

// SearchPhotos handles photo search requests
func (h *Handlers) SearchPhotos(c *gin.Context) {
	query := c.DefaultQuery("query", "nature")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "10"))

	result, err := h.PexelsClient.SearchPhotos(query, page, perPage)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// CuratedPhotos handles curated photos requests
func (h *Handlers) CuratedPhotos(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "10"))

	result, err := h.PexelsClient.CuratedPhotos(page, perPage)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// GetPhoto handles get photo by ID requests
func (h *Handlers) GetPhoto(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid photo ID"})
		return
	}

	result, err := h.PexelsClient.GetPhoto(int32(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// GetRandomPhoto handles random photo requests
func (h *Handlers) GetRandomPhoto(c *gin.Context) {
	result, err := h.PexelsClient.GetRandomPhoto()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// SearchVideos handles video search requests
func (h *Handlers) SearchVideos(c *gin.Context) {
	query := c.DefaultQuery("query", "nature")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "10"))

	result, err := h.PexelsClient.SearchVideos(query, page, perPage)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// PopularVideos handles popular videos requests
func (h *Handlers) PopularVideos(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "10"))

	result, err := h.PexelsClient.PopularVideos(page, perPage)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// GetRandomVideo handles random video requests
func (h *Handlers) GetRandomVideo(c *gin.Context) {
	result, err := h.PexelsClient.GetRandomVideo()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// GetInfo handles API info requests
func (h *Handlers) GetInfo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"remaining_requests": h.PexelsClient.GetRemainingTime(),
		"message":            "Pexels API Client",
	})
}

// HealthCheck handles health check requests
func (h *Handlers) HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "healthy"})
}

package client

import (
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/master-wayne7/go-pexels/internal/models"
)

const (
	PhotosAPI = "https://api.pexels.com/v1"
	VideosAPI = "https://api.pexels.com/v1/videos"
)

// Client is the Pexels API client
type Client struct {
	Token         string
	Client        *http.Client
	RemainingTime int32
}

// NewClient creates a new Pexels API client
func NewClient(apiKey string) *Client {
	return &Client{
		Token: apiKey,
		Client: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// requestDoWithAuth makes a request with authentication
func (c *Client) requestDoWithAuth(method, url string) (*http.Response, error) {
	req, err := http.NewRequest(method, url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", c.Token)

	resp, err := c.Client.Do(req)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("status code: %d", resp.StatusCode)
	}
	times, err := strconv.Atoi(resp.Header.Get("X-Ratelimit-Remaining"))
	if err != nil {
		return nil, err
	}
	c.RemainingTime = int32(times)

	return resp, nil
}

// SearchPhotos searches for photos
func (c *Client) SearchPhotos(query string, page int, perPage int) (*models.SearchResult, error) {
	url := fmt.Sprintf("%s/search?query=%s&page=%d&per_page=%d", PhotosAPI, query, page, perPage)
	resp, err := c.requestDoWithAuth("GET", url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var result models.SearchResult
	err = json.Unmarshal(data, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

// CuratedPhotos gets curated photos
func (c *Client) CuratedPhotos(page int, perPage int) (*models.CuratedResult, error) {
	url := fmt.Sprintf("%s/curated?page=%d&per_page=%d", PhotosAPI, page, perPage)
	resp, err := c.requestDoWithAuth("GET", url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var result models.CuratedResult
	err = json.Unmarshal(data, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

// GetPhoto gets a specific photo by ID
func (c *Client) GetPhoto(id int32) (*models.Photo, error) {
	url := fmt.Sprintf("%s/photos/%d", PhotosAPI, id)
	resp, err := c.requestDoWithAuth("GET", url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var result models.Photo
	err = json.Unmarshal(data, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

// GetRandomPhoto gets a random photo
func (c *Client) GetRandomPhoto() (*models.Photo, error) {
	randomNumber := rand.Intn(1000)
	res, err := c.CuratedPhotos(randomNumber, 1)
	if err != nil {
		return nil, err
	}

	return &res.Photos[0], nil
}

// SearchVideos searches for videos
func (c *Client) SearchVideos(query string, page int, perPage int) (*models.VideoSearchResult, error) {
	url := fmt.Sprintf("%s/search?query=%s&page=%d&per_page=%d", VideosAPI, query, page, perPage)
	resp, err := c.requestDoWithAuth("GET", url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var result models.VideoSearchResult
	err = json.Unmarshal(data, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

// GetRandomVideo gets a random video
func (c *Client) GetRandomVideo() (*models.Video, error) {
	randomNumber := rand.Intn(1000)
	res, err := c.PopularVideos(randomNumber, 1)
	if err != nil {
		return nil, err
	}

	return &res.Videos[0], nil
}

// PopularVideos gets popular videos
func (c *Client) PopularVideos(page int, perPage int) (*models.PopularVideos, error) {
	url := fmt.Sprintf("%s/popular?page=%d&per_page=%d", VideosAPI, page, perPage)
	resp, err := c.requestDoWithAuth("GET", url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var result models.PopularVideos
	err = json.Unmarshal(data, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

// GetRemainingTime returns the remaining API requests
func (c *Client) GetRemainingTime() int32 {
	return c.RemainingTime
}

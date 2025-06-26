package models

// SearchResult represents the response from photo search API
type SearchResult struct {
	Page         int32   `json:"page"`
	PerPage      int32   `json:"per_page"`
	TotalResults int32   `json:"total_results"`
	NextPage     string  `json:"next_page"`
	Photos       []Photo `json:"photos"`
}

// Photo represents a single photo from Pexels
type Photo struct {
	ID              int32    `json:"id"`
	Width           int32    `json:"width"`
	Height          int32    `json:"height"`
	URL             string   `json:"url"`
	Photographer    string   `json:"photographer"`
	PhotographerURL string   `json:"photographer_url"`
	Src             PhotoSrc `json:"src"`
}

// PhotoSrc contains different sizes/formats of a photo
type PhotoSrc struct {
	Original  string `json:"original"`
	Large2X   string `json:"large2x"`
	Large     string `json:"large"`
	Medium    string `json:"medium"`
	Small     string `json:"small"`
	Tiny      string `json:"tiny"`
	Portrait  string `json:"portrait"`
	Landscape string `json:"landscape"`
	Square    string `json:"square"`
}

// CuratedResult represents the response from curated photos API
type CuratedResult struct {
	Page     int32   `json:"page"`
	PerPage  int32   `json:"per_page"`
	NextPage string  `json:"next_page"`
	Photos   []Photo `json:"photos"`
}

// VideoSearchResult represents the response from video search API
type VideoSearchResult struct {
	Page         int32   `json:"page"`
	PerPage      int32   `json:"per_page"`
	TotalResults int32   `json:"total_results"`
	NextPage     string  `json:"next_page"`
	Videos       []Video `json:"videos"`
}

// Video represents a single video from Pexels
type Video struct {
	ID            int32          `json:"id"`
	Width         int32          `json:"width"`
	Height        int32          `json:"height"`
	URL           string         `json:"url"`
	Image         string         `json:"image"`
	FullRes       string         `json:"full_res"`
	Duration      int32          `json:"duration"`
	VideoFiles    []VideoFile    `json:"video_files"`
	VideoPictures []VideoPicture `json:"video_pictures"`
}

// VideoFile represents a video file in different qualities
type VideoFile struct {
	ID       int32  `json:"id"`
	Quality  string `json:"quality"`
	FileType string `json:"file_type"`
	Link     string `json:"link"`
	Height   int32  `json:"height"`
	Width    int32  `json:"width"`
}

// VideoPicture represents a thumbnail/preview image for a video
type VideoPicture struct {
	ID      int32  `json:"id"`
	Picture string `json:"picture"`
	Number  int32  `json:"nr"`
}

// PopularVideos represents the response from popular videos API
type PopularVideos struct {
	Page         int32   `json:"page"`
	PerPage      int32   `json:"per_page"`
	URL          string  `json:"url"`
	TotalResults int32   `json:"total_results"`
	Videos       []Video `json:"videos"`
}

import React, { useState, useEffect } from 'react';
import { Search, Camera, Video, Shuffle, Info, Heart } from 'lucide-react';
import { photoApi, videoApi, utilityApi } from './services/api';
import { Photo, Video as VideoType, ApiInfo } from './types';
import PhotoGallery from './components/PhotoGallery';
import VideoGallery from './components/VideoGallery';
import './index.css';

type Tab = 'photos' | 'videos';
type PhotoMode = 'search' | 'curated' | 'random';
type VideoMode = 'search' | 'popular' | 'random';

function App() {
    const [activeTab, setActiveTab] = useState<Tab>('photos');
    const [searchQuery, setSearchQuery] = useState('nature');
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [videos, setVideos] = useState<VideoType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [photoMode, setPhotoMode] = useState<PhotoMode>('curated');
    const [videoMode, setVideoMode] = useState<VideoMode>('popular');
    const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null);

    useEffect(() => {
        loadInitialContent();
        loadApiInfo();
    }, []);

    useEffect(() => {
        setPhotos([]);
        setVideos([]);
        setPage(1);
        setHasMore(true);
        loadContent(1, true);
    }, [activeTab, photoMode, videoMode, searchQuery]);

    const loadApiInfo = async () => {
        try {
            const info = await utilityApi.getApiInfo();
            setApiInfo(info);
        } catch (err) {
            console.error('Failed to load API info:', err);
        }
    };

    const loadInitialContent = () => {
        setPhotoMode('curated');
        setVideoMode('popular');
        loadContent(1, true);
    };

    const loadContent = async (pageNum: number = page, reset: boolean = false) => {
        setLoading(true);
        setError(null);

        try {
            if (activeTab === 'photos') {
                await loadPhotos(pageNum, reset);
            } else {
                await loadVideos(pageNum, reset);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load content');
        } finally {
            setLoading(false);
        }
    };

    const loadPhotos = async (pageNum: number, reset: boolean) => {
        if (photoMode === 'search') {
            const result = await photoApi.searchPhotos(searchQuery, pageNum, 20);
            if (reset) {
                setPhotos(result.photos);
            } else {
                setPhotos(prev => [...prev, ...result.photos]);
            }
            setHasMore(result.photos.length === 20);
        } else if (photoMode === 'curated') {
            const result = await photoApi.getCuratedPhotos(pageNum, 20);
            if (reset) {
                setPhotos(result.photos);
            } else {
                setPhotos(prev => [...prev, ...result.photos]);
            }
            setHasMore(result.photos.length === 20);
        } else if (photoMode === 'random') {
            const randomPhoto = await photoApi.getRandomPhoto();
            if (reset) {
                setPhotos([randomPhoto]);
            } else {
                setPhotos(prev => [...prev, randomPhoto]);
            }
            setHasMore(false);
        }
    };

    const loadVideos = async (pageNum: number, reset: boolean) => {
        if (videoMode === 'search') {
            const result = await videoApi.searchVideos(searchQuery, pageNum, 20);
            if (reset) {
                setVideos(result.videos);
            } else {
                setVideos(prev => [...prev, ...result.videos]);
            }
            setHasMore(result.videos.length === 20);
        } else if (videoMode === 'popular') {
            const result = await videoApi.getPopularVideos(pageNum, 20);
            if (reset) {
                setVideos(result.videos);
            } else {
                setVideos(prev => [...prev, ...result.videos]);
            }
            setHasMore(result.videos.length === 20);
        } else if (videoMode === 'random') {
            const randomVideo = await videoApi.getRandomVideo();
            if (reset) {
                setVideos([randomVideo]);
            } else {
                setVideos(prev => [...prev, randomVideo]);
            }
            setHasMore(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (activeTab === 'photos') {
            setPhotoMode('search');
        } else {
            setVideoMode('search');
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadContent(nextPage, false);
    };

    const handleModeChange = (mode: PhotoMode | VideoMode) => {
        if (activeTab === 'photos') {
            setPhotoMode(mode as PhotoMode);
        } else {
            setVideoMode(mode as VideoMode);
        }
    };

    const currentMode = activeTab === 'photos' ? photoMode : videoMode;

    return (
        <div className="App">
            {/* Hero Section */}
            <div className="hero">
                <div className="container">
                    <h1>Pexels Gallery</h1>
                    <p>Discover beautiful, free photos and videos from talented creators around the world</p>

                    {apiInfo && (
                        <div className="stats">
                            <div>
                                <Info size={16} style={{ marginRight: '8px', display: 'inline' }} />
                                API Requests Remaining: {apiInfo.remaining_requests}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Search Section */}
            <div className="search-section">
                <div className="container">
                    {/* Tab Buttons */}
                    <div className="tab-buttons">
                        <button
                            className={`tab-button ${activeTab === 'photos' ? 'active' : ''}`}
                            onClick={() => setActiveTab('photos')}
                        >
                            <Camera size={18} />
                            Photos
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
                            onClick={() => setActiveTab('videos')}
                        >
                            <Video size={18} />
                            Videos
                        </button>
                    </div>

                    {/* Mode Buttons */}
                    <div className="tab-buttons">
                        {activeTab === 'photos' ? (
                            <>
                                <button
                                    className={`tab-button ${photoMode === 'curated' ? 'active' : ''}`}
                                    onClick={() => handleModeChange('curated')}
                                >
                                    <Heart size={16} />
                                    Curated
                                </button>
                                <button
                                    className={`tab-button ${photoMode === 'search' ? 'active' : ''}`}
                                    onClick={() => handleModeChange('search')}
                                >
                                    <Search size={16} />
                                    Search
                                </button>
                                <button
                                    className={`tab-button ${photoMode === 'random' ? 'active' : ''}`}
                                    onClick={() => handleModeChange('random')}
                                >
                                    <Shuffle size={16} />
                                    Random
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className={`tab-button ${videoMode === 'popular' ? 'active' : ''}`}
                                    onClick={() => handleModeChange('popular')}
                                >
                                    <Heart size={16} />
                                    Popular
                                </button>
                                <button
                                    className={`tab-button ${videoMode === 'search' ? 'active' : ''}`}
                                    onClick={() => handleModeChange('search')}
                                >
                                    <Search size={16} />
                                    Search
                                </button>
                                <button
                                    className={`tab-button ${videoMode === 'random' ? 'active' : ''}`}
                                    onClick={() => handleModeChange('random')}
                                >
                                    <Shuffle size={16} />
                                    Random
                                </button>
                            </>
                        )}
                    </div>

                    {/* Search Form */}
                    {((activeTab === 'photos' && photoMode === 'search') ||
                        (activeTab === 'videos' && videoMode === 'search')) && (
                            <form onSubmit={handleSearch} className="search-controls">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={`Search for ${activeTab}...`}
                                    className="search-input"
                                />
                                <button type="submit" className="btn btn-primary">
                                    <Search size={18} />
                                    Search
                                </button>
                            </form>
                        )}
                </div>
            </div>

            {/* Content */}
            <div className="gallery">
                <div className="container">
                    {error && (
                        <div className="error">
                            {error}
                        </div>
                    )}

                    {loading && (photos.length === 0 && videos.length === 0) && (
                        <div className="loading">
                            Loading...
                        </div>
                    )}

                    {activeTab === 'photos' && photos.length > 0 && (
                        <PhotoGallery photos={photos} />
                    )}

                    {activeTab === 'videos' && videos.length > 0 && (
                        <VideoGallery videos={videos} />
                    )}

                    {/* Load More Button */}
                    {hasMore && (photos.length > 0 || videos.length > 0) && (
                        <div className="pagination">
                            <button
                                onClick={handleLoadMore}
                                disabled={loading}
                                className="btn btn-secondary"
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App; 
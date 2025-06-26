import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { Download, ExternalLink, Play } from 'lucide-react';
import { Video } from '../types';
import VideoModal from './VideoModal';

interface VideoGalleryProps {
    videos: Video[];
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos }) => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    const breakpointColumns = {
        default: 3,
        1400: 3,
        900: 2,
        600: 1,
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getBestQualityVideo = (video: Video) => {
        const hd = video.video_files.find(file => file.quality === 'hd');
        const sd = video.video_files.find(file => file.quality === 'sd');
        return hd || sd || video.video_files[0];
    };

    const handleDownload = (video: Video, e: React.MouseEvent) => {
        e.stopPropagation();
        const bestVideo = getBestQualityVideo(video);
        if (bestVideo) {
            const link = document.createElement('a');
            link.href = bestVideo.link;
            link.download = `pexels-video-${video.id}.${bestVideo.file_type}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleViewOriginal = (video: Video, e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(video.url, '_blank');
    };

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumns}
                className="masonry-grid"
                columnClassName="masonry-column"
            >
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="video-item"
                        onClick={() => setSelectedVideo(video)}
                    >
                        <div style={{ position: 'relative' }}>
                            <img
                                src={video.image}
                                alt={`Video ${video.id}`}
                                loading="lazy"
                            />
                            <div className="video-duration">
                                {formatDuration(video.duration)}
                            </div>
                            <div className="video-overlay">
                                <Play size={48} color="white" />
                            </div>
                        </div>
                        <div className="item-info">
                            <div className="video-info">
                                <p>Duration: {formatDuration(video.duration)}</p>
                                <p>Resolution: {video.width} x {video.height}</p>
                            </div>
                            <div className="video-actions">
                                <button
                                    className="action-btn download-btn"
                                    onClick={(e) => handleDownload(video, e)}
                                >
                                    <Download size={14} />
                                    Download
                                </button>
                                <button
                                    className="action-btn view-btn"
                                    onClick={(e) => handleViewOriginal(video, e)}
                                >
                                    <ExternalLink size={14} />
                                    View Original
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Masonry>

            <VideoModal
                video={selectedVideo!}
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
            />
        </>
    );
};

export default VideoGallery; 
import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { Video } from '../types';

interface VideoModalProps {
    video: Video;
    isOpen: boolean;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const getBestQualityVideo = () => {
        const hd = video.video_files.find(file => file.quality === 'hd');
        const sd = video.video_files.find(file => file.quality === 'sd');
        return hd || sd || video.video_files[0];
    };

    const handleDownload = () => {
        const bestVideo = getBestQualityVideo();
        if (bestVideo) {
            const link = document.createElement('a');
            link.href = bestVideo.link;
            link.download = `pexels-video-${video.id}.${bestVideo.file_type}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const bestVideo = getBestQualityVideo();

    return (
        <div className="modal" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>
                {bestVideo && (
                    <video
                        controls
                        autoPlay
                        loop
                        muted
                        src={bestVideo.link}
                        poster={video.image}
                    />
                )}
                <div className="modal-info">
                    <div className="item-info">
                        <div className="video-info">
                            <p>Duration: {formatDuration(video.duration)}</p>
                            <p>Resolution: {video.width} x {video.height}</p>
                            {bestVideo && <p>Quality: {bestVideo.quality.toUpperCase()}</p>}
                        </div>
                        <div className="video-actions">
                            <button className="action-btn download-btn" onClick={handleDownload}>
                                <Download size={14} />
                                Download
                            </button>
                            <a
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-btn view-btn"
                            >
                                <ExternalLink size={14} />
                                View on Pexels
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoModal; 
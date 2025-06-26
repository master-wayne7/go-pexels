import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { Photo } from '../types';

interface PhotoModalProps {
    photo: Photo;
    isOpen: boolean;
    onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = photo.src.large2x;
        link.download = `pexels-photo-${photo.id}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="modal" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>
                <img
                    src={photo.src.large2x}
                    alt={`Photo by ${photo.photographer}`}
                    loading="lazy"
                />
                <div className="modal-info">
                    <div className="item-info">
                        <div className="photographer">
                            Photo by{' '}
                            <a
                                href={photo.photographer_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {photo.photographer}
                            </a>
                        </div>
                        <div className="photo-actions">
                            <button className="action-btn download-btn" onClick={handleDownload}>
                                <Download size={14} />
                                Download
                            </button>
                            <a
                                href={photo.url}
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

export default PhotoModal; 
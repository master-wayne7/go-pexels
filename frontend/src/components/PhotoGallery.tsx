import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { Download, ExternalLink } from 'lucide-react';
import { Photo } from '../types';
import PhotoModal from './PhotoModal';

interface PhotoGalleryProps {
    photos: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    const breakpointColumns = {
        default: 4,
        1400: 3,
        900: 2,
        600: 1,
    };

    const handleDownload = (photo: Photo, e: React.MouseEvent) => {
        e.stopPropagation();
        const link = document.createElement('a');
        link.href = photo.src.large2x;
        link.download = `pexels-photo-${photo.id}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewOriginal = (photo: Photo, e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(photo.url, '_blank');
    };

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumns}
                className="masonry-grid"
                columnClassName="masonry-column"
            >
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="photo-item"
                        onClick={() => setSelectedPhoto(photo)}
                    >
                        <img
                            src={photo.src.medium}
                            alt={`Photo by ${photo.photographer}`}
                            loading="lazy"
                        />
                        <div className="item-info">
                            <div className="photographer">
                                Photo by{' '}
                                <a
                                    href={photo.photographer_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {photo.photographer}
                                </a>
                            </div>
                            <div className="photo-actions">
                                <button
                                    className="action-btn download-btn"
                                    onClick={(e) => handleDownload(photo, e)}
                                >
                                    <Download size={14} />
                                    Download
                                </button>
                                <button
                                    className="action-btn view-btn"
                                    onClick={(e) => handleViewOriginal(photo, e)}
                                >
                                    <ExternalLink size={14} />
                                    View Original
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Masonry>

            <PhotoModal
                photo={selectedPhoto!}
                isOpen={!!selectedPhoto}
                onClose={() => setSelectedPhoto(null)}
            />
        </>
    );
};

export default PhotoGallery; 
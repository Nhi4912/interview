'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  className?: string;
}

const ImageContainer = styled.figure`
  margin: 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    .image-overlay {
      opacity: 1;
    }
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
`;

const ExpandIcon = styled.div`
  color: white;
  font-size: 2rem;
`;

const Caption = styled.figcaption`
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #64748b;
  text-align: center;
  font-style: italic;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  max-width: 90vw;
  max-height: 90vh;
  position: relative;

  img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -2rem;
  right: -2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  caption,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if the image is external (starts with http or https)
  const isExternal = src.startsWith('http');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ImageContainer className={className}>
      <ImageWrapper>
        {isExternal ? (
          // For external images
          <img src={src} alt={alt} style={{ width: '100%', height: 'auto' }} loading="lazy" />
        ) : (
          // For local images with Next.js Image component
          <StyledImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            layout="responsive"
            objectFit="contain"
            quality={90}
          />
        )}
        <ImageOverlay className="image-overlay" onClick={openModal}>
          <ExpandIcon>🔍</ExpandIcon>
        </ImageOverlay>
      </ImageWrapper>

      {caption && <Caption>{caption}</Caption>}

      {isModalOpen && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <img src={isExternal ? src : src} alt={alt} />
            <CloseButton onClick={closeModal}>×</CloseButton>
          </ModalContent>
        </Modal>
      )}
    </ImageContainer>
  );
};

export default ResponsiveImage;

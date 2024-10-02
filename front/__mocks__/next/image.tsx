import React from 'react';

// Define the props for the mock component, including priority
interface MockImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean; // Add priority as an optional prop
}

// Create a mock component for next/image
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MockedImage: React.FC<MockImageProps> = ({ src, alt, priority, ...props }) => {
  return <img src={src} alt={alt} {...props} />;
};

export default MockedImage;

import React, { useState, useEffect, useLayoutEffect } from "react";

interface ProductModalDimensionsProps {
  aspectRatio: number;
  targetWidth: number;
  targetHeight: number;
}

const ProductModalDimensions = ({
  aspectRatio,targetWidth,targetHeight
}: ProductModalDimensionsProps) => {
  // const targetWidth = window.innerWidth;
  // const targetHeight = window.innerHeight;

  const calculateDimensions = () => {
    let finalWidth;
    let finalHeight;

    if (aspectRatio > 1) {
      // Horizontal aspect image
      finalWidth = targetWidth;
      finalHeight = finalWidth / aspectRatio;

      // Check if finalHeight exceeds currentWindowSize.height
      if (finalHeight > targetHeight) {
        finalHeight = targetHeight;
        finalWidth = finalHeight * aspectRatio;
      }
    } else {
      // Vertical aspect image
      finalHeight = targetHeight;
      finalWidth = finalHeight * aspectRatio;

      // Check if finalWidth exceeds currentWindowSize.width
      if (finalWidth > targetWidth) {
        finalWidth = targetWidth;
        finalHeight = finalWidth / aspectRatio;
      }
    }

    // Calculate margins to center the modal
    const horizontalMargin = (targetWidth - finalWidth) / 2;
    const verticalMargin = (targetHeight - finalHeight) / 2;

    return {
      width: finalWidth,
      height: finalHeight,
      margin: `${verticalMargin}px ${horizontalMargin}px`,
    };
  };

  return calculateDimensions()
};

export default ProductModalDimensions;

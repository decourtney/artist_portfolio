interface Props {
  aspectRatio: number;
  maxWidth: number;
  maxHeight: number;
  minWidth?: number;
  minHeight?: number;
  marginPosition?: string;
}

const GetModalDimensions = ({
  aspectRatio,
  maxWidth,
  maxHeight,
  minWidth = 0,
  minHeight = 0,
  marginPosition = "center",
}: Props) => {
  const calculateDimensions = () => {
    let finalWidth = Math.max(minWidth, maxWidth);
    let finalHeight = Math.max(minHeight, maxHeight);

    if (aspectRatio > 1) {
      finalHeight = finalWidth / aspectRatio;

      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = finalHeight * aspectRatio;
      }
    } else {
      finalWidth = finalHeight * aspectRatio;

      if (finalWidth > maxWidth) {
        finalWidth = maxWidth;
        finalHeight = finalWidth / aspectRatio;
      }
    }

    // Adjust dimensions if they exceed the minimum requirements
    if (finalWidth < minWidth) {
      finalWidth = minWidth;
      finalHeight = finalWidth / aspectRatio;
    }

    if (finalHeight < minHeight) {
      finalHeight = minHeight;
      finalWidth = finalHeight * aspectRatio;
    }

    // Calculate margins to center the modal
    let horizontalMargin;
    let verticalMargin;

    if (minWidth > 0 && minHeight > 0) {
      horizontalMargin = (minWidth - finalWidth) * 0.5;
      verticalMargin = (minHeight - finalHeight) * 0.5;
    } else {
      horizontalMargin = (maxWidth - finalWidth) * 0.5;
      verticalMargin = (maxHeight - finalHeight) * 0.5;
    }

    // Adjust margin for first and last item
    if (marginPosition === "left") {
      horizontalMargin = 0;
    } else if (marginPosition === "right") {
      horizontalMargin = horizontalMargin * 2;
    }

    return {
      width: finalWidth,
      height: finalHeight,
      margin: `${verticalMargin}px ${horizontalMargin}px`,
    };
  };

  return calculateDimensions();
};

export default GetModalDimensions;

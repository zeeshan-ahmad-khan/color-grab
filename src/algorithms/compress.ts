export const compressImage = (image: HTMLImageElement) => {
  // Resize the canvas to a smaller size for compression
  const maxWidth = 800;
  const maxHeight = 600;
  let width = image.width;
  let height = image.height;

  if (width > maxWidth) {
    height *= maxWidth / width;
    width = maxWidth;
  }

  if (height > maxHeight) {
    width *= maxHeight / height;
    height = maxHeight;
  }

  return { width, height };
};

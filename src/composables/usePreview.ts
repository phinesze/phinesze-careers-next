export const usePreviewFont = () => {
  const setRootFontSize = (size: string) => {
    const html = document.querySelector("html");
    if (html) {
      html.style.fontSize = size;
    }
  };

  return {
    setRootFontSize,
  };
};

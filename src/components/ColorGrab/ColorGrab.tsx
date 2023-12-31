import "./colorgrab.css";
import { useEffect, useRef, useState } from "react";
import { getRgbValuesArray, rgbToHex } from "../../utils/converter";
import { clusterType } from "../../types/utilTypes";
import { kmeans } from "../../algorithms/kmeans";
import { compressImage } from "../../algorithms/compress";
import Loader from "../Loader/Loader";

function ColorGrab() {
  const [colors, setColors] = useState<string[]>([]);
  const [ctx, setCtx] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const canvasRef: any = useRef(null);

  const handleFileChange = (e: any) => {
    setIsLoading(true);
    const file = e.target.files[0];
    if (!file) setIsLoading(false);
    const imageUrl = URL.createObjectURL(file);
    setImgUrl(imageUrl);
    const img = new Image();
    img.src = imageUrl;
    img.onload = async () => {
      const { width, height } = compressImage(img);
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      // Draw the resized image on the canvas
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const data = imageData.data;
      // ALGORITHMS TO EXTRACT IMAGE'S COLOR
      //   const rgbValues = getRgbValuesKV(data);
      //   const channel = colorChannelWithGreatestRange(rgbValues);
      //   const colors = medianCutAlgorithm(rgbValues, channel as keyof rgbType);
      //   setColors(colors);
      const rgbValues: number[][] = getRgbValuesArray(data);
      const cluster: clusterType = await kmeans(rgbValues);
      // console.log(cluster);
      const val = cluster.labels.map((label: any) => {
        const [r, g, b] = label.centroid;
        return rgbToHex({ r, g, b });
      });
      setColors([...new Set(val)]);
      setIsLoading(false);
    };
  };

  useEffect(() => {
    setCtx(canvasRef.current.getContext("2d"));
  });

  return (
    <div className="grab">
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="outer">
            <div className="input-group">
              <button>Upload Image</button>
              <input
                type="file"
                accept="image/*"
                id="upload"
                onChange={handleFileChange}
              />
            </div>
            <div id="output">
              {colors.map((clr, i: number) => {
                return (
                  <div
                    className="wrapper"
                    key={i}
                    onClick={() => {
                      navigator.clipboard.writeText(clr);
                      alert(`${clr.toUpperCase()} Color Copied!`);
                    }}
                  >
                    <div
                      className="color"
                      style={{ backgroundColor: clr }}
                    ></div>
                    <span className="hex">{clr.toUpperCase()}</span>
                  </div>
                );
              })}
            </div>
            {imgUrl !== "" && !isLoading && (
              <img
                src={imgUrl}
                alt="uploaded image"
                className="display-image"
              />
            )}
          </div>
        )}
        <canvas id="image-canvas" ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default ColorGrab;

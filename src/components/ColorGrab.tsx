import { useEffect, useRef, useState } from "react";
import {
  getRgbValuesArray,
  getRgbValuesKV,
  rgbToHex,
} from "../utils/converter";
import { clusterType, rgbType } from "../types/utilTypes";
import { kmeans } from "../algorithms/kmeans";
import { colorChannelWithGreatestRange } from "../utils/utils";
import { medianCutAlgorithm } from "../algorithms/quantize";

function ColorGrab() {
  const [colors, setColors] = useState<rgbType[]>([]);
  const [ctx, setCtx] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef: any = useRef(null);

  const handleFileChange = (e: any) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = imageUrl;
    img.onload = async () => {
      canvasRef.current.width = img.width;
      canvasRef.current.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const data = imageData.data;
      //   const rgbValues = getRgbValuesKV(data);
      //   const channel = colorChannelWithGreatestRange(rgbValues);
      //   const colors = medianCutAlgorithm(rgbValues, channel as keyof rgbType);
      //   setColors(colors);
      const rgbValues: number[][] = getRgbValuesArray(data);
      const cluster: clusterType = await kmeans(rgbValues);
      console.log(cluster);
      const val = cluster.labels.map((label: any) => {
        const [r, g, b] = label.centroid;
        return { r, g, b };
      });
      setColors(val);
      setIsLoading(false);
    };
  };

  useEffect(() => {
    setCtx(canvasRef.current.getContext("2d"));
  });

  return (
    <div className="grab">
      {isLoading && <h1>LOADING...</h1>}
      <div className="container">
        <div className="outer">
          <input
            type="file"
            accept="image/*"
            id="upload"
            onChange={handleFileChange}
          />
          <div id="output">
            {colors.map((clr, i: number) => {
              const { r, g, b } = clr;
              const color = `rgb(${r},${g},${b})`;
              return (
                <div
                  className="wrapper"
                  key={i}
                  onClick={() => {
                    navigator.clipboard.writeText(color);
                  }}
                >
                  <div
                    className="color"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="hex">{rgbToHex(clr).toUpperCase()}</span>
                </div>
              );
            })}
          </div>
        </div>
        <canvas id="image-canvas" ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default ColorGrab;

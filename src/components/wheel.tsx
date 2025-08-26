"use client";

import { useState, useEffect } from "react";
import LoginModal from "./login";

export default function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string>("");
  const [radius, setRadius] = useState(210);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 360) {
        setRadius(130); // điện thoại nhỏ 320px
      } else if (window.innerWidth < 640) {
        setRadius(163.5); // sm
      } else {
        setRadius(210); // desktop
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const segments = [
    { text: "$5", color: "#ECE19A" },
    { text: "$50", color: "#F6ECBD" },
    { text: "$5", color: "#ECE19A" },
    { text: "Extra spin", color: "#F6ECBD" },
    { text: "$5", color: "#ECE19A" },
    { text: "$5", color: "#F6ECBD" },
    { text: "No Prize", color: "#ECE19A" },
    { text: "$8", color: "#F6ECBD" },
  ];


  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult("");

    const spins = 5 + Math.random() * 5;
    const segmentAngle = 360 / segments.length;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const finalRotation =
      rotation + spins * 360 + randomSegment * segmentAngle + segmentAngle / 2;

    setRotation(finalRotation);

    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const winnerIndex =
        Math.floor((360 - normalizedRotation) / segmentAngle) % segments.length;
      const winner = segments[winnerIndex];
      setResult(winner.text);
      setIsSpinning(false);
    }, 4000); // thời gian trùng với animation
  };


  // Hàm tạo path cho từng segment
  const createSegmentPath = (index: number, total: number) => {
    const angle = (360 / total) * index;
    const nextAngle = (360 / total) * (index + 1);
    const x1 = radius + radius * Math.cos((angle * Math.PI) / 180);
    const y1 = radius + radius * Math.sin((angle * Math.PI) / 180);
    const x2 = radius + radius * Math.cos((nextAngle * Math.PI) / 180);
    const y2 = radius + radius * Math.sin((nextAngle * Math.PI) / 180);

    return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl sm:text-3xl mb-2.5 text-primary text-[2rem] font-extrabold">
        SPIN & EARN
      </h1>
      <p className="mb-9 font-medium text-sm text-center">
        Turn every spin into crypto rewards on blockchain
      </p>

      <div className="relative border-[12px] border-solid border-[#40BE50] rounded-full">
        <svg
          width={radius * 2}
          height={radius * 2}
          className="transition-transform duration-4000 ease-out flex justify-center items-center origin-center rounded-full shadow-[0_0px_10px_rgba(0,0,0,1)]"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? "transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              : "none",
          }}
        >
          {/* Các phân đoạn */}
          {segments.map((seg, i) => (
            <g key={i}>
              <path
                d={createSegmentPath(i, segments.length)}
                fill={seg.color}
                stroke="#fff"
                strokeWidth="1"
              />
              <text
                x={radius}
                y={radius}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${
                  (360 / segments.length) * i + 360 / (2 * segments.length)
                } ${radius} ${radius}) translate(0,-${radius * 0.65})`}
                className="font-bold text-xs fill-gray-800"
              >
                {seg.text}
              </text>
            </g>
          ))}
          {/* Các chấm vàng */}
          {segments.map((_, i) => {
            const angle = (360 / segments.length) * i;
            const x = radius + (radius - 6) * Math.cos((angle * Math.PI) / 180);
            const y = radius + (radius - 6) * Math.sin((angle * Math.PI) / 180);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="5"
                fill="#FFD700"
                stroke="white"
                strokeWidth="1"
                z={10}
              />
            );
          })}
          {segments.map((seg, i) => (
            <g key={i}>
              <path
                d={createSegmentPath(i, segments.length)}
                fill={seg.color}
                stroke="#fff"
                strokeWidth="1"
              />
              <text
                x={radius}
                y={radius}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${
                  (360 / segments.length) * i + 360 / (2 * segments.length) + 90
                } ${radius} ${radius}) translate(0,-${radius * 0.65})`}
                className="text-sm sm:text-xl font-medium fill-[#2F7A01]"
              >
                {seg.text}
              </text>
            </g>
          ))}
          {/* Nắp tròn ở tâm */}
        </svg>
        {/* Các chấm vàng trên border ngoài */}
        {segments.map((_, i) => {
          const angle = (360 / segments.length) * i;
          const x = radius + Math.cos((angle * Math.PI) / 180) * (radius + 6); // 6 ≈ nửa border
          const y = radius + Math.sin((angle * Math.PI) / 180) * (radius + 6);

          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
                animationDelay: `${i * 0.2}s`, // lệch pha giữa các chấm
              }}
            >
              {/* Glow nhấp nháy */}
              <div className="w-5 h-5 rounded-full bg-yellow-600 blur-md opacity-80 animate-blink"></div>

              {/* Dot chính */}
              <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-[#D0FF00]"></div>
            </div>
          );
        })}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Button tròn */}
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={[
              "relative h-16 w-16 rounded-full",
              "bg-[#4DD054] text-white font-extrabold text-[0.9375rem]",
              "border-none",
              "flex items-center justify-center",
              "transition-transform duration-200",
              !isSpinning ? "active:scale-95" : "",
            ].join(" ")}
            style={{
              boxShadow: "inset 0 0px 10px rgba(0,0,0,0.3)", // bóng đổ bên trong
            }}
          >
            {/* Ảnh overlay */}
            <img
              src="/Union.png"
              alt="overlay"
              className="absolute -inset-[15px] w-[4.25rem] h-[5.5rem] object-contain pointer-events-none right-2 ml-[0.85rem] -mt-2"
            />

            {/* Text */}
            <span className="relative z-10">SPIN</span>
          </button>
        </div>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-red-500 z-10"></div>
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="mt-8 px-20 py-3.5 bg-primary text-white text-sm sm:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed border-transparent rounded-lg border-none"
      >
        {isSpinning ? "Spinning..." : "SPIN"}
      </button>

      {/* {result && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800">
            Result: <span className="text-[#2F7A01]">{result}</span>
          </p>
        </div>
      )} */}
    </div>
  );
}

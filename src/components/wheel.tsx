// src/components/SpinWheel.tsx
"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((m) => m.Wheel),
  { ssr: false }
);

// Màu theo mock
const COLORS = {
  rimDark: "#2f9d3a",
  rimLight: "#6cd36b",
  sliceA: "#f6eec8",
  sliceB: "#f3e3a8",
  text: "#2f7d2a",
  center: "#24c565",
  centerDark: "#17a04f",
  peg: "#ffd428",
  pegStroke: "#e6b700",
};

// Dữ liệu giải thưởng
const RAW_PRIZES = [
  "50$",
  "5$",
  "Extra spin",
  "5$",
  "No Prize",
  "$80",
  "$15",
  "No Prize",
  "$5",
  "5$",
];

export default function SpinWheel() {
  const size = 360; // đường kính bánh xe (px)
  const pegCount = RAW_PRIZES.length; // số chấm vàng = số lát

  const data = useMemo(
    () =>
      RAW_PRIZES.map((label, i) => ({
        option: label,
        style: {
          backgroundColor: i % 2 === 0 ? COLORS.sliceA : COLORS.sliceB,
          textColor: COLORS.text,
          fontSize: 20,
          fontWeight: 700,
          fontFamily: "Inter, ui-sans-serif, system-ui",
        },
      })),
    []
  );

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const handleSpin = () => {
    if (mustSpin) return;
    const next = Math.floor(Math.random() * data.length);
    setPrizeNumber(next);
    setMustSpin(true);
    setResult(null);
  };

  // Tính các peg vàng quanh mép (absolute + rotate + translate)
  const pegs = Array.from({ length: pegCount }).map((_, i) => {
    const angle = (360 / pegCount) * i + 360 / (pegCount * 2); // nằm giữa 2 đường chia
    return (
      <span
        key={i}
        className="absolute rounded-full"
        style={{
          left: "50%",
          top: "50%",
          width: 10,
          height: 10,
          transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${size / 2 - 8}px)`,
          background: COLORS.peg,
          boxShadow: `0 0 0 1px ${COLORS.pegStroke} inset`,
        }}
      />
    );
  });

  return (
    <div className="flex flex-col items-center">
      {/* khung chứa để căn và thêm viền 2 lớp, pointer, peg */}
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          // viền ngoài đậm
          border: `12px solid ${COLORS.rimDark}`,
          borderRadius: "50%",
        }}
      >
        {/* viền trong nhạt (vòng mỏng) */}
        <span
          className="absolute inset-2 rounded-full"
          style={{ border: `10px solid ${COLORS.rimLight}` }}
        />

        {/* pointer xanh ở đỉnh */}
        <span
          className="absolute left-1/2 -top-[14px] -translate-x-1/2"
          aria-hidden
        >
          <svg width="28" height="28" viewBox="0 0 28 28">
            <path
              d="M14 0 L27 28 H1 Z"
              fill={COLORS.center}
              stroke={COLORS.centerDark}
              strokeWidth="2"
            />
          </svg>
        </span>

        {/* chấm vàng quanh mép */}
        {pegs}

        {/* Vòng quay (canvas của lib) */}
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
            setResult(RAW_PRIZES[prizeNumber]);
          }}
          backgroundColors={[COLORS.sliceA, COLORS.sliceB]}
          textColors={[COLORS.text]}
          outerBorderColor="transparent" // ta đã vẽ rim bên ngoài
          outerBorderWidth={0}
          innerBorderColor="transparent" // rim trong đã overlay
          innerBorderWidth={0}
          radiusLineColor="#ffffff"
          radiusLineWidth={2}
          fontSize={20}
          perpendicularText={false} // để chữ xoay giống mẫu
          textDistance={56}
          spinDuration={1.2}
          // ẩn pointer mặc định của lib vì ta tự overlay pointer
          pointerProps={{ style: { display: "none" } }}
        />

        {/* nút SPIN ở tâm */}
        <button
          onClick={handleSpin}
          disabled={mustSpin}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full disabled:opacity-60"
          style={{
            width: 82,
            height: 82,
            background: COLORS.center,
            border: `4px solid ${COLORS.centerDark}`,
            boxShadow:
              "0 6px 12px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,0.22)",
          }}
        >
          <span className="text-white font-extrabold tracking-wider">SPIN</span>
        </button>
      </div>

      {/* nút dưới (nếu bạn muốn kiểu mock #2) */}
      {/* <button className="mt-6 px-10 py-3 bg-emerald-500 text-white rounded-xl shadow">SPIN</button> */}

      {/* kết quả */}
      <div className="mt-4">
        {result ? (
          <span className="inline-block rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-sm font-semibold shadow-sm">
            Result: {result}
          </span>
        ) : (
          <span className="text-slate-500 text-sm">Nhấn nút xanh để quay</span>
        )}
      </div>
    </div>
  );
}

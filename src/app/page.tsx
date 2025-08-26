"use client";
import LoginModal from 'components/login'
import App from 'components/wheel'
import React from 'react'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


const rootElement = document.getElementById("root");
const root = rootElement ? createRoot(rootElement) : null;

export default function HomePage() {
  return (
    <div>
      <LoginModal />
      root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    </div>
  )
}
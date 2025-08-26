"use client";
import LoginModal from 'components/login'
import App from 'components/wheel'
import React from 'react'
import { StrictMode } from "react";

export default function HomePage() {
  return (
    <div className='mt-36 mb-24 flex flex-col items-center justify-center'>
      <StrictMode>
        <App />
      </StrictMode>
      <div className="mt-[1.375rem] text-sm text-[#0D1F3C] flex items-center">
        Already have an account? <LoginModal />
      </div>
    </div>
  )
}
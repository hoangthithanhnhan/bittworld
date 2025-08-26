"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { EyeOff, Eye } from "lucide-react";
import Image from "next/image";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", 
  maxWidth: 640,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"login" | "register">("login");
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <Button onClick={handleOpen}>Login</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="flex flex-col justify-center items-center px-[1.5625rem]">
          <h4 className="text-black text-center text-[1.25rem] font-bold py-[1.3125rem]">
            CONNECT ACCOUNT
          </h4>

          {/* Tab switch */}
          <div className="flex justify-center w-fit py-1 px-[0.375rem] bg-[#E6E9EC] rounded-lg my-4 mx-2">
            <div
              onClick={() => setActiveTab("login")}
              className={`flex items-center justify-center rounded-md text-xs sm:text-sm font-medium h-8 w-40 cursor-pointer ${
                activeTab === "login" ? "bg-primary text-white" : "text-[#7E7E7E]"
              }`}
            >
              Login
            </div>
            <div
              onClick={() => setActiveTab("register")}
              className={`flex items-center justify-center rounded-md text-xs sm:text-sm font-medium h-8 w-40 cursor-pointer ${
                activeTab === "register" ? "bg-primary text-white" : "text-[#7E7E7E]"
              }`}
            >
              Register
            </div>
          </div>

          {/* Form */}
          {activeTab === "login" ? (
            <>
              <label className="font-bold text-sm w-full mb-2">Email</label>
              <div className="bg-[#F1F1F1] py-[0.875rem] px-4 flex items-center w-full border-[#E6E9EC] rounded-md mb-3">
                <Image src="/user.png" alt="Email Icon" width="20" height="20" />
                <input
                  type="email"
                  placeholder="Enter email"
                  className="bg-transparent border-none outline-none ml-2 w-full"
                />
              </div>
              <label className="font-bold text-sm w-full mb-2">Password</label>
              <div className="bg-[#F1F1F1] py-[0.875rem] px-4 flex items-center w-full border-[#E6E9EC] rounded-md mb-3">
                <Image src="/pass.png" alt="Password Icon" width="20" height="20" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="bg-transparent border-none outline-none ml-2 w-full"
                />
                <div onClick={togglePassword} className="cursor-pointer w-5 h-5 ">
                  {showPassword ? (
                    <Eye style={{ color: "#989CAB", height: "20px", width: "20px" }} />
                  ) : (
                    <EyeOff style={{ color: "#989CAB", height: "20px", width: "20px" }} />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center w-full mb-8">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                  <p className="text-sm">Remember login</p>
                </div>
                <a href="#" className="text-black text-sm">
                  Forgot password?
                </a>
              </div>
              <button className="font-medium text-[1rem] py-3 px-32 bg-primary rounded-md border-none text-white mb-6">
                LOGIN
              </button>
            </>
          ) : (
            <>
              <label className="font-bold text-sm w-full mb-2">Email</label>
              <div className="bg-[#F1F1F1] py-[0.875rem] px-4 flex items-center w-full border-[#E6E9EC] rounded-md mb-8">
                <Image src="/user.png" alt="Email Icon" width="20" height="20" />
                <input
                  type="email"
                  placeholder="Enter email to receive verification code"
                  className="bg-transparent border-none outline-none ml-2 w-full"
                />
              </div>
              <button className="font-medium text-[1rem] py-3 px-32 bg-primary rounded-md border-none text-white mb-6">
                SEND CODE
              </button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

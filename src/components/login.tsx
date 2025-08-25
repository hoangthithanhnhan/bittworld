"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { EyeOff, Eye } from 'lucide-react';
import Checkbox from '@mui/material/Checkbox';
import Image from "next/image";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 640,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='flex flex-col justify-center items-center px-[1.5625rem]'>
            <h4 className='text-black text-center text-[1.25rem] font-bold py-[1.3125rem]'>CONNECT ACCOUNT</h4>
            <div className='flex justify-center w-fit py-1 px-[0.375rem] bg-[#E6E9EC] rounded-lg my-4'>
                <div className='flex items-center justify-center bg-primary rounded-md text-sm font-medium text-white h-8 w-40'>Login</div>
                <div className='flex items-center justify-center text-sm rounded-md font-medium h-8 w-40 text-center text-[#7E7E7E]'>Register</div>
            </div>
            <label className='font-bold text-sm w-full mb-2'>Email</label>
            <div className='bg-[#F1F1F1] py-[0.875rem] px-4 flex items-center w-full border-[#E6E9EC] rounded-md mb-3'>
              <Image src="user.png" alt="Email Icon" width='20' height='20' />
              <input type="email" placeholder="Enter email" className='bg-transparent border-none outline-none ml-2 w-full' />
            </div>
            <label className='font-bold text-sm w-full mb-2'>Password</label>
            <div className='bg-[#F1F1F1] py-[0.875rem] px-4 flex items-center w-full border-[#E6E9EC] rounded-md mb-3'>
              <Image src="pass.png" alt="Password Icon" width='20' height='20' />
              <input type="password" placeholder="Enter" className='bg-transparent border-none outline-none ml-2 w-full' />
              <div>
                <EyeOff style={{ color: "#989CAB" }} />
              </div>
            </div>
            <div>
                <div>
                    <Checkbox {...label} size="small" sx={{ '& .MuiSvgIcon-root': { fontSize: 17 } }} />
                    <p>Remember login</p>
                </div>
                <a href="#">Forgot password?</a>
            </div>
            <button>LOGIN</button>
        </Box>
      </Modal>
    </div>
  );
}

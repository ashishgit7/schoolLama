"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
import ConfirmPassword from '@/components/ConfirmPassword'
interface InputOtpProps {
    onVerify: (otp: string) => void;
}

const InputOtp: React.FC<InputOtpProps> = ({ onVerify }) => {
    const [otp, setOtp] = useState('');
    const searchParams = useSearchParams()
    const [otpSuccess, setOtpSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseURL}/api/password-recovery/verify-otp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
            });
            if (response.ok) {
            setOtpSuccess(true);
            }
        } catch (error) {
          console.error('Error verifying OTP:', error);
        }
        
    };
    useEffect(() => {
      if (searchParams) {
        setEmail(searchParams.get('email') || '');
      }
    }, [searchParams]);

    return (
        <div className="flex flex-col justify-center items-center h-screen ">
            {otpSuccess ? (
          <ConfirmPassword email={email} />
            ) : (
          <>
              <label htmlFor="otp-input">Enter OTP for {email}</label>
              <form onSubmit={handleSubmit} id="otp-input">
            <InputOTP maxLength={6} onChange={(value) => setOtp(value)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <div className="flex justify-between w-full mt-2">
                <Button type="submit">Verify OTP</Button>
                <Button onClick={() => alert('Resend OTP')}>Resend OTP</Button>
            </div>
              </form>
          </>
            )}
        </div>
    );
};

export default InputOtp;
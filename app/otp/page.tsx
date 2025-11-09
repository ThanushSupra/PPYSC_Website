"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { REGEXP_ONLY_DIGITS } from "input-otp"

import { useState } from "react";

export default function Otp() {

    const [value, setValue] = useState("");
  
    
    return (
    <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-sm">

        <CardHeader>
            <CardTitle>Verify your Email</CardTitle>
            <CardDescription>
            Enter your one time verification code sent to your email
            </CardDescription>
        </CardHeader>

        <CardContent>
            <form className="">
                <div className="flex justify-center items-center">
                    <InputOTP 
                        maxLength={6}
                        value={value}
                        onChange={(value) => setValue(value)}
                        pattern={REGEXP_ONLY_DIGITS}
                        >
                        <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div className="text-center text-sm">
                    {value === "" ? (
                    <>Enter your one-time password.</>
                    ) : (
                    <>You entered: {value}</>
                    )}
                </div>
            </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
            Verify OTP
            </Button>
        </CardFooter>
        </Card> 
    </div>
  )
}

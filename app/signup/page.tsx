import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationSchema } from "@/lib/schema";
import type { z } from "zod";
import Link from "next/link";

export default function signup() {
  
    return (
    <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle>Create an account and sign up</CardTitle>
            <CardDescription>
                Enter the details below to create your account
            </CardDescription>
            <CardAction>
            <Button variant="link" asChild>
                <Link href="/login">Login</Link>    
            </Button>
            </CardAction>
        </CardHeader>
        <CardContent>
            <form>
                <div className="flex flex-col gap-6">

                    <div className="grid gap-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" type="text" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" type="text" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" type="text" required />
                    </div>

                    
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>


                    <div className="grid gap-2">
                        <Label htmlFor="number">Phone Number</Label>
                        <Input id="number" type="number" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                </div>
            </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
                <Link href="/otp">Sign up</Link>
            </Button>
            <Button variant="outline" className="w-full">
                Sign up with Google
            </Button>
        </CardFooter>
        </Card> 
    </div>



  )
}

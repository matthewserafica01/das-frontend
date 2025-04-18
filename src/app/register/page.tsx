"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(0, { message: "Name must be more than 0 characters" }).max(50),
    email: z.string().min(2, { message: "Email must be at least 2 characters.", }).max(50),
    password: z.string(),
})

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const res = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Registration failed');
            }

            const result = await res.json();

            localStorage.setItem('auth_token', result.token);

            router.push('/home');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    }


    return (
        <div className="flex flex-col h-screen justify-between bg-gray-50">
            <main className="h-screen">
                <div className="grid grid-cols-2 grid-rows-1 place-content-center h-screen content-start">
                    {/* form side */}
                    <div className="flex flex-col items-center py-4 self-center">
                        <div className="w-2/3 p-6 rounded-lg h-full">
                            <div className=" px-10 py-1.5 pb-6">
                                <h1 className="text-3xl font-semibold mb-4">Make a new account!</h1>
                                <p className="font-semibold text-gray-500 mb-2">Enter your details and register!</p>
                            </div>
                            <div className="px-10 space-y-4">
                                <div>
                                    <Button className="w-full font-semibold hover:cursor-pointer" size="lg" variant="outline">
                                        <Mail /> Continue with Google
                                    </Button>
                                </div>
                                <div className="grid grid-cols-3 items-center p-4">
                                    <Separator className="" />
                                    <div className="flex flex-col items-center">
                                        <p className="text-center text-sm">or register with email</p>
                                    </div>
                                    <Separator />
                                </div>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        {error && <p className="text-red-500">{error}</p>}
                                        <FormField control={form.control} name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-semibold">Name</FormLabel>
                                                    <FormControl>
                                                        <Input className="bg-white" placeholder="Juan" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField control={form.control} name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-semibold">Email</FormLabel>
                                                    <FormControl>
                                                        <Input className="bg-white" placeholder="juandelacruz@gmail.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField control={form.control} name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input className="bg-white" type="password" placeholder="********" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid grid-cols-2 content-between w-full py-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox className="bg-white" id="remember-me" />
                                                <Label htmlFor="remember-me">Remember me</Label>
                                            </div>
                                            <div className="flex flex-col items-end w-full">
                                                <p className="text-sm hover:cursor-pointer hover:underline underline-offset-4">Forgot password?</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm">
                                                Already have an account? Login <Link href="/login"><span className="hover:underline hover:text-blue-500">here</span></Link>
                                            </p>
                                        </div>
                                        <Button className="w-full hover:cursor-pointer" size="lg" type="submit">Make account</Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>

                    {/* image side */}
                    <div className="flex flex-col items-center w-full h-full">
                        <div className="flex flex-col items-center w-full h-full">
                            <div className="bg-red-500 w-8/9 h-full m-6 rounded-lg shadow">

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

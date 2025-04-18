"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("auth_token");

        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            router.push("/login");
        }
    }, []);

    if (isLoggedIn === null) {
        return <div>Loading...</div>
    }

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        router.push("/login");
    };

    return (
        <div>
            <Button onClick={handleLogout} variant="destructive" className="hover:cursor-pointer">Logout</Button>
            <p>Welcome back</p>
        </div>
    );
}
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export interface User {
    id: string;
    name: string;
    email: string;
}
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = Cookies.get("token");
        const storedUser = Cookies.get("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const login = (userData: User, token: string) => {
        setUser(userData);
        setToken(token);
        Cookies.set("token", token);
        Cookies.set("user", JSON.stringify(userData));
        router.push("/Dashboard/chat");
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        Cookies.remove("token");
        Cookies.remove("user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
    return context;
};
"use client";

import { createContext } from "react";
import { User } from "./authContextProvider";

interface AuthContextType {
  user: User | null;   
  token: string | null; 
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);




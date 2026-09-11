import { IAuthContext } from "@/types/auth";
import { createContext } from "react";

const AuthContext = createContext<IAuthContext | null>(null)

export default AuthContext
import { SignJWT, jwtVerify } from 'jose'
import Payload from '@/types/payload'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

const generateJwt = async (payload: Payload) => {
    return new SignJWT({ ...payload }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").sign(secret);

}

const verifyJwt = async (token: string) => {
    if (!token) {
        return { payload: {} }
    }
    const { payload } = await jwtVerify(token, secret);
    return payload
}

export { generateJwt, verifyJwt }

import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_ALGORITHM = "HS256";

// Create a secret key from the string
function getSecretKey() {
  return new TextEncoder().encode(SECRET_KEY);
}

export async function signToken(payload: { adminId: string; email: string }) {
  const secret = getSecretKey();
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("7d") // 7 days
    .sign(secret);

  return token;
}

export async function verifyToken(token: string) {
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret, {
      algorithms: [JWT_ALGORITHM],
    });
    return payload as { adminId: string; email: string };
  } catch (error) {
    return null;
  }
}

import jwt, { JwtPayload } from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { RequestHandler } from "express";

interface TokenPayload extends JwtPayload {
    id: string;
    role: string;
}

const auth = (): RequestHandler => {
    return async (req, res, next) => {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).send("Unauthorized");
        }

        const token = header.split(" ")[1];

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;

            const [user] = await db.select().from(users).where(eq(users.id, payload.id));

            if (!user) return res.status(401).send("Unauthorized");

            if (user.authToken !== token) {
                return res.status(401).send("Unauthorized");
            }

            req.user = {
                id: user.id,
                role: user.role,
                email: user.email,
            };

            next();
        } catch (err) {
            return res.status(401).send("Unauthorized");
        }
    };
};

export default auth;

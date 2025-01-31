import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { databases } from "../../../lib/appwrite.config";
import { Query } from "node-appwrite";
const userCollection = process.env.NEXT_PUBLIC_USER_COLLECTION || "";
const Teacher_DB = process.env.NEXT_PUBLIC_TEACHER_DB || "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { email,password } = req.body;
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    
    if (!secretKey) {
        throw new Error("Secret key is not defined");
    }

    const user = await databases.listDocuments(Teacher_DB, userCollection, [
        Query.equal("Email", [email]),
        Query.equal("Password", [password])
    ]);

    if (user.documents.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    const token = jwt.sign({ id: user.documents[0].teacherInfo.$id }, secretKey, { expiresIn: "30d" });
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=1296000`);
    res.status(200).json({ role: user.documents[0].Role, id: user.documents[0].teacherInfo.$id });
}

import { NextApiRequest,NextApiResponse } from "next";
import { databases, Teacher_DB, Student_Info_Collection_KEY } from "../../../lib/appwrite.config";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    const {id} = req.query;

    switch (req.method) {
        case 'GET':
            return getStudent(req, res, id as string);
        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}

async function getStudent(req: NextApiRequest, res: NextApiResponse, id: string) {
    try {
        const student = await databases.getDocument(Teacher_DB, Student_Info_Collection_KEY, id);
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: 'Teacher not found' });
    }
}
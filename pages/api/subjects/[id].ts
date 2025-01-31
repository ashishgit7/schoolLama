import { NextApiRequest,NextApiResponse } from "next";
import { databases, Teacher_DB, Subject_Info_Collection_KEY} from "../../../lib/appwrite.config";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    const {id} = req.query;

    switch (req.method) {
        case 'GET':
            return getSubject(req, res, id as string);
        case 'PATCH':
            return updateSubject(req, res, id as string)
        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}

async function getSubject(req: NextApiRequest, res: NextApiResponse, id: string) {
    try {
        const subject = await databases.getDocument(Teacher_DB, Subject_Info_Collection_KEY, id);
        res.status(200).json(subject);
    } catch (error) {
        res.status(404).json({ message: 'Teacher not found' });
    }
}

async function updateSubject(req: NextApiRequest, res: NextApiResponse, id: string) {
    try {
        const {SubjectInfo} = req.body;
        const subject = await databases.updateDocument
        (
            Teacher_DB, 
            Subject_Info_Collection_KEY, 
            id,
            SubjectInfo
        );
        res.status(200).json(subject);
    } catch (error) {
        res.status(404).json({ message: error});
    }
}


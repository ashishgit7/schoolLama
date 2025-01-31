import { NextApiRequest, NextApiResponse } from "next";
import { databases, Teacher_DB, Teacher_Info_Collection_KEY } from "../../../lib/appwrite.config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    switch (req.method) {
        case 'GET':
            return getTeacher(req, res, id as string);
        case 'PUT':
            return updateTeacher(req, res, id as string);
        case 'DELETE':
            return deleteTeacher(req, res, id as string);
        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}

async function getTeacher(req: NextApiRequest, res: NextApiResponse, id: string) {
    try {
        const id = req.query.id as string;
        const teacher = await databases.getDocument(Teacher_DB, Teacher_Info_Collection_KEY, id);
        res.status(200).json(teacher);
    } catch (error) {
        res.status(404).json({ message: 'Teacher not found' });
    }
}

async function updateTeacher(req: NextApiRequest, res: NextApiResponse, id: string) {
    const { name, subject } = req.body;
    try {
        const updatedTeacher = await databases.updateDocument(
            Teacher_DB,
            Teacher_Info_Collection_KEY,
            id,
            { name, subject }
        );
        res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(404).json({ message: 'Teacher not found' });
    }
}

async function deleteTeacher(req: NextApiRequest, res: NextApiResponse, id: string) {
    try {
        await databases.deleteDocument(Teacher_DB, Teacher_Info_Collection_KEY, id);
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ message: 'Teacher not found' });
    }
}

import { Query } from "node-appwrite";
import { databases, Teacher_DB, Student_Info_Collection_KEY,Teacher_Info_Collection_KEY } from "../../../lib/appwrite.config";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
          return getCalendarEvents(req, res);
        // case 'POST':
        //   return createStudents(req, res);
        // case 'PUT':
        //   return updateTeacher(req, res);
        // case 'DELETE':
        //   return deleteTeacher(req, res);
        default:
          return res.status(405).end(`Method ${req.method} Not Allowed`);
      }
}

async function getCalendarEvents(req: NextApiRequest, res: NextApiResponse) {
    const {role, id} = req.query;
    if(!role || !id) {
        return res.status(400).json({message: 'Role and ID are required'});
    }
    switch (role) {
        case 'Teacher':
            const teacher = await databases.getDocument(Teacher_DB, Teacher_Info_Collection_KEY, id as string);
            const subjectsInfo = teacher.subjectsInfo;
            return res.status(200).json({subjectsInfo});
        default:
            return res.status(400).json({message: 'Role is invalid'});
    }
}
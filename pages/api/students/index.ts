import { databases, Teacher_DB, Student_Info_Collection_KEY} from "../../../lib/appwrite.config";
import { NextApiRequest, NextApiResponse } from 'next';
import { Query} from "node-appwrite";  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
          return getStudents(req, res);
        case 'POST':
          return createStudents(req, res);
        // case 'PUT':
        //   return updateTeacher(req, res);
        // case 'DELETE':
        //   return deleteTeacher(req, res);
        default:
          return res.status(405).end(`Method ${req.method} Not Allowed`);
      }
}

async function createStudents(req: NextApiRequest, res: NextApiResponse) {
    const {StudentInfoArray} = req.body;
    const promises = StudentInfoArray.map((studentInfo: any) => {
      return databases.createDocument(
        Teacher_DB,
        Student_Info_Collection_KEY,
        'unique()',
        studentInfo
      )
    })  

    const results = await Promise.all(promises);
    res.status(201).json(results);
}

async function getStudents(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, perPage = 10 } = req.query;
  const students = await databases.listDocuments(Teacher_DB, Student_Info_Collection_KEY,
    [
      Query.limit(Number(perPage)),
      Query.offset((Number(page) - 1) * Number(perPage) || 0)
    ]
  );
  res.status(200).json(students);
}


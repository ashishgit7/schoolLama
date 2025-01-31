import { Query } from "node-appwrite";
import {databases, Teacher_DB, Teacher_Info_Collection_KEY, storage} from "../../../lib/appwrite.config";
import { config } from 'dotenv';
config();
const bucketId = process.env.NEXT_PUBLIC_BUCKET_ID;

  
  export default function handler(req, res) {
    switch (req.method) {
      case 'GET':
        return getTeachers(req, res);
      case 'POST':
        return createTeachers(req, res);
      case 'PUT':
        return updateTeacher(req, res);
      case 'DELETE':
        return deleteTeacher(req, res);
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  

  async function getTeachers(req, res) {
    const { page = 1, perPage = 10 } = req.query;
    const result = await databases.listDocuments(
      Teacher_DB,
      Teacher_Info_Collection_KEY,
      [
        Query.limit(perPage),
        Query.offset((page - 1) * perPage)
      ]
    );
    res.status(200).json(result);  

  }
  
  
  async function createTeachers(req, res) {
    const {teacherInfoArray} = req.body;

    const promises = teacherInfoArray.map(teacherInfo => {
      teacherInfo.ImageID = "66e07402001a7e6ef19f"
      return databases.createDocument(
        Teacher_DB,
        Teacher_Info_Collection_KEY,
        'unique()',
        teacherInfo
      )
    })  

    const results = await Promise.all(promises);
    res.status(201).json(results);
  }
  
  function updateTeacher(req, res) {
    const { id } = req.query;
    const { name, subject } = req.body;
    const teacherIndex = teachers.findIndex(t => t.id === id);
    
    if (teacherIndex === -1) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    teachers[teacherIndex] = { ...teachers[teacherIndex], name, subject };
    res.status(200).json(teachers[teacherIndex]);
  }
  
  function deleteTeacher(req, res) {
    const { id } = req.query;
    const teacherIndex = teachers.findIndex(t => t.id === id);
    
    if (teacherIndex === -1) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    teachers.splice(teacherIndex, 1);
    res.status(204).end();
  }
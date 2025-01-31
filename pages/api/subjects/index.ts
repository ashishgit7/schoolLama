import { databases, Teacher_DB, Subject_Info_Collection_KEY, Classes_Info_Collection_KEY} from "../../../lib/appwrite.config";
import { NextApiRequest, NextApiResponse } from 'next';
import { Query} from "node-appwrite";  

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
      case 'GET':
        return getSubjects(req, res);
      case 'POST':
        return createSubjects(req, res);
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }

async function getSubjects(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1, perPage = 10 } = req.query;
  const subjects = await databases.listDocuments(Teacher_DB, Subject_Info_Collection_KEY,
    [
      Query.limit(Number(perPage)),
      Query.offset((Number(page) - 1) * Number(perPage) || 0)
    ]
  );
  res.status(200).json(subjects);
}
  
async function createSubjects(req: NextApiRequest, res: NextApiResponse) {
    
    const {SubjectInfo} = req.body;
    const name = SubjectInfo.name
    const classInfo = SubjectInfo.classInfo
    const subjectData = await databases.listDocuments(Teacher_DB,Classes_Info_Collection_KEY,
        [Query.equal("$id", [classInfo])]
    )

    const isSubject = subjectData.documents[0].subjectsInfo.find((subjectData:any)=> subjectData.Name === name);
    if(isSubject){
        return res.send('subject already exist')
    }



    const results = await databases.createDocument(
        Teacher_DB,
        Subject_Info_Collection_KEY,
        'unique()',
        SubjectInfo
      )
    res.status(201).json(results);

}


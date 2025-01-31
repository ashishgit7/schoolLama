import { NextApiRequest, NextApiResponse } from "next";
import { databases, Teacher_DB, Classes_Info_Collection_KEY} from "../../../lib/appwrite.config";
import { Query } from "node-appwrite";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getClasses(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getClasses(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, perPage = 10 } = req.query;
  const students = await databases.listDocuments(
    Teacher_DB,
    Classes_Info_Collection_KEY,
    [
      Query.limit(Number(perPage)),
      Query.offset((Number(page) - 1) * Number(perPage) || 0),
    ]
  );
  res.status(200).json(students);
}

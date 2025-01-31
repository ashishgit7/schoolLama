import { NextApiRequest, NextApiResponse } from 'next';
import { databases, Email,OTP_Collection_KEY,Password, Teacher_DB, User_Collection_KEY } from '../../../lib/appwrite.config';
import { Query } from 'node-appwrite';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required' });
    }

    try {
        const result = await databases.listDocuments(
            Teacher_DB,
            User_Collection_KEY,
            [Query.equal('Email', [email])]
        )
        await databases.updateDocument(
            Teacher_DB,
            User_Collection_KEY,
            result.documents[0].$id,
            { Password: newPassword }
        )

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: (error as any).message });
    }
}
import { NextApiRequest, NextApiResponse } from 'next';
import { databases, OTP_Collection_KEY, Teacher_DB } from '../../../lib/appwrite.config';
import { Query } from 'node-appwrite';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { otp,email } = req.body;

    if (!otp || !email) {
        return res.status(400).json({ message: 'OTP and email are required' });
    }

    try {
        const otpRecord = await databases.listDocuments(
            Teacher_DB,
            OTP_Collection_KEY,
            [Query.equal('email', [email])]
        )
        
        if (otpRecord.documents.length === 0) {
            return res.status(404).json({ message: 'OTP not found' });
        }

        if (otpRecord.documents[0].OTP != otp) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        // OTP is valid, you can proceed with further actions (e.g., password recovery)
        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
}
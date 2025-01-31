import nodemailer from 'nodemailer';
import { databases, Email,OTP_Collection_KEY,Password, Teacher_DB, User_Collection_KEY } from '../../../lib/appwrite.config';

import { NextApiRequest, NextApiResponse } from 'next';
import { Query } from 'node-appwrite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const result = await databases.listDocuments(
        Teacher_DB,
        User_Collection_KEY,
        [Query.equal('Email', [email])]
    )

    if(result.documents.length === 0)
        return res.status(404).json({ message: 'Email not found' });
    
    const otp = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: Email,
            pass: Password,
        },
    });

    const mailOptions = {
        from: Email,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    try {
        const OtpDB = await databases.listDocuments(
            Teacher_DB,
            OTP_Collection_KEY,
            [Query.equal('email', [email])]
        )

        if (OtpDB.documents.length > 0) {
            const documentId = OtpDB.documents[0].$id;
            await databases.updateDocument(
                Teacher_DB,
                OTP_Collection_KEY,
                documentId,
                { OTP: otp } 
            );
        } else {
            await databases.createDocument(
                Teacher_DB,
                OTP_Collection_KEY,
                'unique()',
                {
                    email: email,
                    OTP: otp
                }
            );
        }
        
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error });
    }
}
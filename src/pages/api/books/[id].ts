import { prisma } from '@/libs/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    try {
      const deletedContact = await prisma.book.delete({
        where: {
          id: req.query.id as string,
        },
      });

      res.status(200).json(deletedContact);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({ message: 'Failed to delete' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const createRes = await prisma.book.update({
        where: {
          id: req.query.id as string,
        },
        data: req.body,
      });

      res.status(200).json(createRes);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({ message: 'Failed to edit' });
    }
  }
}

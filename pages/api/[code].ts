// pages/api/items/[code].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (req.method === 'GET') {
    try {
      const item = await prisma.item.findUnique({
        where: { code: code as string },
      });
      if (!item) return res.status(404).json({ error: 'Item not found' });
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching item' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

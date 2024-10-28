// pages/api/items/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, description, price, stock } = req.body;
    try {
      const updatedItem = await prisma.item.update({
        where: { id: Number(id) },
        data: { name, description, price, stock },
      });
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: 'Error updating item' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

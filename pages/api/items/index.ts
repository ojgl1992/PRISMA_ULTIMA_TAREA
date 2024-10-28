// pages/api/items/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const items = await prisma.item.findMany();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching items' });
    }
  } else if (req.method === 'POST') {
    const { code, name, description, price, stock } = req.body;
    try {
      const newItem = await prisma.item.create({
        data: { code, name, description, price, stock },
      });
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: 'Error creating item' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

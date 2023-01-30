import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, email, phone, imageUrl } = req.body;
  try {
    if (imageUrl === null) {
      const contact = await prisma.contact.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          phone,
        },
      });
      return res.status(200).json(contact);
    } else {
      const contact = await prisma.contact.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          phone,
          imageUrl,
        },
      });
      res.status(200).json(contact);
    }
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, email, phone, imageUrl } = req.body;
  try {
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
  } catch (e) {
    res.status(400).json({ message: "Contact does not exist" });
  }
}

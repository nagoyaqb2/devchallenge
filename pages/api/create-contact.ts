import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, phone, imageUrl } = req.body;
  const exists = await prisma.contact.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    return res.status(400).json({ message: "Contact already exists" });
  } else {
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        imageUrl,
      },
    });
    res.status(200).json(contact);
  }
}

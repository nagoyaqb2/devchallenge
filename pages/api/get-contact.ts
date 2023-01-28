import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(contact);
  } catch (e) {
    res.status(400).json({ message: "Contact does not exist" });
  }
}

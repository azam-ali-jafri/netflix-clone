import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { user } = await serverAuth(req, res);
    const favouriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: user?.favouriteIds,
        },
      },
    });

    return res.status(200).json(favouriteMovies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

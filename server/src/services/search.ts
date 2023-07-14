import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const GetSearchItems: any = async (
  request: Request,
  response: Response
) => {
  const lowercasedSearchString: string = request.body.toLowerCase();
  //extract the search string from the request body to array of strings
  const searchStrings: string[] = request.body.split(" ");
  const lowercasedSearchStrings: string[] = searchStrings.map(
    (string: string) => string.toLowerCase()
  );

  const item: any = await Prisma.item
    .findMany({
      where: {
        OR: [
          { name: { contains: lowercasedSearchString, mode: "insensitive" } },
          {
            description: {
              contains: lowercasedSearchString,
              mode: "insensitive",
            },
          },
          {
            category: {
              hasSome: lowercasedSearchStrings,
            },
          },
        ],
      },
    })
    .then((success) => {
      return response.status(200).json(success);
    })
    .catch((error) => {
      return response.status(400).json(error);
    });
};

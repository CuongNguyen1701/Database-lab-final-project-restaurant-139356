import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const GetSearchItems: any = async (
  request: Request,
  response: Response
) => {
  // console.log(request.body);
  const lowercasedSearchString: string = request.body.data.toLowerCase();
  //extract the search string from the request body to array of strings
  // const searchStrings: string[] = request.body.data.split(" ");
  const lowercasedSearchStrings: string[] = request.body.map((string: string) =>
    string.toLowerCase()
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

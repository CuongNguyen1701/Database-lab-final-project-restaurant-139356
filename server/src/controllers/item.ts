import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const CreateItem: any = async (request: Request, response: Response) => {
  const { name, price, description, category, photo }: any = request.body;

  const item: object = await Prisma.item
    .create({
      data: {
        name: name,
        price: price,
        description: description,
        category: category,
        photo: photo,
      },
    })
    .then(() => {
      return response.status(200).json("👨🏾 Item created");
    })
    .catch((error) => {
      return response.status(400).json(error);
    });
};
export const DeleteItem: any = async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.item_id);
  const item: any = await Prisma.item
    .delete({
      where: {
        id,
      },
    })
    .then((success) => {
      if (success === null) {
        return response.status(400).json("⚠️ Error Item Not Found");
      }
      return response.json(success);
    })
    .catch(() => {
      return response.status(400).json("⚠️ Error Item not found");
    });
};
export const DeleteAllItems: any = async (
  request: Request,
  response: Response
) => {
  const item: any = await Prisma.item
    .deleteMany()
    .then((success) => {
      return response.status(200).json("👨🏾 Items deleted");
    })
    .catch((error) => {
      return response.status(400).json(error);
    });
};

export const GetAllItems: any = async (
  request: Request,
  response: Response
) => {
  const skip: number = parseInt(request.params.page_id) * 10;
  const items: any = await Prisma.item
    .findMany({ skip: skip, take: 10 })
    .then((success) => {
      return response.status(200).json(success);
    })
    .catch((error) => {
      return response.status(400).json(error);
    });
};
export const GetItem: any = async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.item_id);
  const item: any = await Prisma.item
    .findUnique({
      where: {
        id,
      },
    })
    .then((success) => {
      if (success === null) {
        return response.status(400).json("⚠️ Error Item Not Found");
      } else {
        return response.status(200).json(success);
      }
    })
    .catch(() => {
      return response.status(400).json("⚠️ Error Item Not Found");
    });
};

export const UpdateItem: any = async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.item_id);
  const { price, description, category, photo }: any = request.body;
  const update: object = await Prisma.item
    .update({
      where: {
        id,
      },
      data: {
        price,
        description,
        category,
        photo,
      },
    })
    .then((success) => {
      if (success === null) {
        return response.status(403).json("⚠️ Error Item Not Found");
      }
      return response.status(203).json(success);
    })
    .catch(() => {
      return response.status(403).json("⚠️ Error Item not Found");
    });
};

export const SaveFancyItem: any = async (
  request: Request,
  response: Response
) => {
  const update: object = await Prisma.fancy
    .create({
      data: {
        customerID: request.user!.id,
        itemID: parseInt(request.params.item_id),
      },
    })
    .then((success) => {
      if (success === null) {
        return response.status(400).json("⚠️ Error Item Not Found");
      }
      return response.status(203).json(success);
    })
    .catch(() => {
      return response.status(400).json("⚠️ Error Item not Found");
    });
};

export const GetFancyItems: any = async (
  request: Request,
  response: Response
) => {
  const item: any = await Prisma.fancy
    .findMany({
      where: {
        customerID: request.body.id,
      },
    })
    .then((success) => {
      return response.status(200).json(success);
    })
    .catch((error) => {
      return response.status(400).json(error);
    });
};
export const DeleteFancyItem: any = async (
  request: Request,
  response: Response
) => {
  const id: number = parseInt(request.params.item_id);
  const item: any = await Prisma.fancy
    .delete({
      where: {
        customerID_itemID: {
          itemID: id,
          customerID: request.user!.id,
        },
      },
    })
    .then((success) => {
      if (success === null) {
        return response.status(400).json("⚠️ Error Item Not Found");
      }
      return response.status(200).json(success);
    })
    .catch(() => {
      return response.status(400).json("⚠️ Error Item not Found");
    });
};

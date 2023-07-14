import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const CreateOrder: any = async (data: any) => {
  const { discountPercent, totalCost, staffID, customerID }: any = data;
  const date: string = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const order: any = await Prisma.order.create({
    data: {
      discountPercent,
      createdAt: date,
      totalCost,
      staffID,
      customerID,
    },
  });
  return order;
};
export const CreateOrderItem: any = async (req: Request, res: Response) => {
  const order: any = await CreateOrder(req.body);
  const arr: any = req.body.listItem;
  try {
    arr.forEach(async (item: any) => {
      let orderItem: any = await Prisma.orderItem.create({
        data: {
          orderID: order.id,
          itemID: item.id,
        },
      });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
  return res.status(200).json("👨🏾 Order created");
};
export const DeleteOrderItem: any = async (
  request: Request,
  response: Response
) => {
  const id: number = parseInt(request.params.order_id);
  const order: any = await Prisma.orderItem
    .delete({
      where: {
        id,
      },
    })
    .then((success) => {
      if (success === null) {
        return response.status(400).json("⚠️ Error Order Not Found");
      }
      return response.json(success);
    })
    .catch(() => {
      return response.status(400).json("⚠️ Error Order not found");
    });
};

export const GetAllOrderItems: any = async (
  request: Request,
  response: Response
) => {
  const order: any = await Prisma.orderItem
    .findMany()
    .then((success) => {
      return response.status(201).json(success);
    })
    .catch((error) => {
      return response.status(401).json(error);
    });
};

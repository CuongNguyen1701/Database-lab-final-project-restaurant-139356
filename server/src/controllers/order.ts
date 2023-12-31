import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
export const CreateOrder: any = async (data: any) => {
  const { discountPercent, totalCost, customerID }: any = data;
  const date: string = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const order: any = await Prisma.order.create({
    data: {
      id: uuid(),
      discountPercent,
      createdAt: date,
      totalCost,
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
          quantity: item.quantity,
        },
      });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
  return res.status(200).json(order.id);
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
  const order: any = await Prisma.order.findMany({
    where: {
      customerID: request.params.customer_id,
    },
  });
  // console.log(order);

  const promise = order.map(async (ele: any) => {
    let orderItem: any = await Prisma.orderItem.findMany({
      where: {
        orderID: ele.id,
      },
    });
    const promise2 = orderItem.map(async (item: any) => {
      let itemDetail: any = await Prisma.item.findUnique({
        where: {
          id: item.itemID,
        },
      });
      item.itemDetail = itemDetail;
      // console.log(itemDetail);
      return item;
    });
    return Promise.all(promise2).then((result) => {
      return result;
    });
  });
  Promise.all(promise).then((result) => {
    console.log(result);
    response.status(200).send(JSON.stringify(result));
  });
};
export const GetAllOrderItemsAdmin: any = async (
  request: Request,
  response: Response
) => {
  const allOrders = await Prisma.order.findMany();
  const promise = allOrders.map(async (ele: any) => {
    let orderItem: any = await Prisma.orderItem.findMany({
      where: {
        orderID: ele.id,
      },
    });
    return orderItem;
  });
  Promise.all(promise).then((result) => {
    console.log(result);
    response.status(200).send(JSON.stringify(result));
  });
};

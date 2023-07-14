import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const CreateBooking: any = async (
  request: Request,
  response: Response
) => {
  const { customerCount, timeBookings, note }: any = request.body;

  const item: object = await Prisma.booking
    .create({
      data: {
        customerCount,
        timeBookings,
        note,
        customerID: request.user!.id,
      },
    })
    .then(() => {
      return response.status(200).json("👨🏾 Booking created");
    })
    .catch((error) => {
      return response.status(400).json(error);
    });
};
export const DeleteBooking: any = async (
  request: Request,
  response: Response
) => {
  const id: number = parseInt(request.params.booking_id);
  const booking: any = await Prisma.booking
    .delete({
      where: {
        id,
      },
    })
    .then((success) => {
      if (success === null) {
        return response.status(400).json("⚠️ Error Booking Not Found");
      }
      return response.status(200).json(success);
    })
    .catch(() => {
      return response.status(400).json("⚠️ Error Booking not found");
    });
};
export const GetAllBookings: any = async (
  request: Request,
  response: Response
) => {
  const booking: any = await Prisma.booking
    .findMany()
    .then((success) => {
      if (success === null) {
        return response.status(400).json("⚠️ Error Booking Not Found");
      }
      return response.status(200).json(success);
    })
    .catch((error) => {
      return response.status(400).json(error);
    });
};

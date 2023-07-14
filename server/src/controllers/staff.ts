import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const CreateStaff: any = async (
  request: Request,
  response: Response
) => {
  const { name, role, phone, shiftStart, shiftEnd }: any = request.body;
  const staff: any = await Prisma.staff
    .create({
      data: {
        name,
        role,
        phone,
        shiftStart,
        shiftEnd,
      },
    })
    .then(() => {
      return response.status(200).json("👨🏾 Staff created");
    })
    .catch((error) => {
      return response.status(400).json(error);
    });
};
export const DeleteStaff: any = async (
  request: Request,
  response: Response
) => {
  const id: number = parseInt(request.params.staff_id);
  const staff: any = await Prisma.staff
    .delete({
      where: {
        id,
      },
    })
    .then((success) => {
      if (success === null) {
        return response.status(400).json("⚠️ Error Staff Not Found");
      }
      return response.status(200).json(success);
    })
    .catch(() => {
      return response.status(400).json("⚠️ Error Staff not found");
    });
};
export const GetAllStaffs: any = async (
  request: Request,
  response: Response
) => {
  const staff: any = await Prisma.staff
    .findMany()
    .then((success) => {
      if (success === null) {
        return response.status(400).json("⚠️ Error Staff Not Found");
      }
      return response.status(200).json(success);
    })
    .catch((error) => {
      return response.status(400).json(error);
    });
};

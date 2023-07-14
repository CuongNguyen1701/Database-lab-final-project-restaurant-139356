import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

// Validation
// import { _passwordIsValid } from "../validation/passwordValidate";
// import { _emailIsValid } from "../validation/emailValidate";
import bcrypt from "bcrypt";

export const CreateUser: any = async (data: any) => {
  console.log(data.id, data.name, data.username, data.password);
  const existingUser: any = await GetUser(data.id);
  if (existingUser) {
    const updated = await UpdateUser(data);
    return updated;
  }
  var salt = null;
  var hash = null;
  if (data.password) {
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(data.password, salt);
  }
  const created: any = await Prisma.customer
    .create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        photo: data.photo,
        salt: salt,
        hash: hash,
      },
    })
    .then(() => {
      console.log("👨🏾 User Registered");
      return created;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};
export const DeleteUser: any = async (request: Request, response: Response) => {
  const deleted: any = await Prisma.customer
    .delete({
      where: {
        id: request.user!.id,
      },
    })
    .then((success) => {
      if (success === null) {
        return response.status(400).json("⚠️ Error User Not Found");
      }
      return response.json(success);
    })
    .catch(() => {
      return response.status(400).json("⚠️ Error User not found");
    });
};

export const GetAllUsers: any = async (
  request: Request,
  response: Response
) => {
  const user: any = await Prisma.customer
    .findMany()
    .then((success) => {
      return response.status(200).json(success);
    })
    .catch((error) => {
      return response.status(400).json(error);
    });
};

export const GetUser: any = async (id: string) => {
  const customer: any = await Prisma.customer.findUnique({
    where: {
      id: id,
    },
  });
  return customer;
};
export const UpdateUser: any = async (data: any) => {
  const update: any = await Prisma.customer.update({
    where: {
      id: data.id,
    },
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      photo: data.photo,
    },
  });
  return update;
};

export const UpdatePassword: any = async (data: any) => {
  let salt: any = bcrypt.genSaltSync(10);
  let hash: any = bcrypt.hashSync(data.password, salt);
  const update: any = await Prisma.customer
    .update({
      where: {
        id: data.id || data.googleId || data.facebookId,
      },
      data: {
        salt,
        hash,
      },
    })
    .then((success) => {
      if (success === null) {
        return null;
      }
      return success;
    })
    .catch(() => {
      return null;
    });
};

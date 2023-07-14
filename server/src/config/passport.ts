import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
} from "passport-google-oauth20";
import { Prisma } from "../database/prismaClient";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { GetUser, UpdateUser, CreateUser } from "../controllers/user";
enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
type UserObj = {
  id: string;
  name: string;
  role: Role;
  email?: string;
  photo?: string;
  address?: string;
  age?: number;
  gender?: string;
  phone?: string;
  salt?: string;
  hash?: string;
};
declare global {
  namespace Express {
    interface User extends UserObj {
      id: string;
    }
  }
}
passport.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    console.log(username, password);
    try {
      const customer: any = await Prisma.customer.findUnique({
        where: {
          id: username,
        },
      });
      if (customer) {
        console.log("user foundjj");
        if (customer === null) {
          return done(null, false);
        }
        if (customer.hash) {
          if (!bcrypt.compareSync(password, customer.hash)) {
            console.log("passwords do not match");
            return done(null, false);
          }
        }
        console.log("user found & authenticated");
        return done(null, customer);
      }
      return done(null, false);
    } catch (err) {
      console.log(err);
      return done(null, false);
    }
  })
);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async (
      req: Request,
      accessToken: any,
      refreshToken: any,
      profile: GoogleProfile,
      done
    ) => {
      // check if user existed
      const date = new Date().toLocaleString("sv-SE", {
        timeZone: "Asia/Ho_Chi_Minh",
      });
      if (profile.id) {
        const data = {
          id: profile.id,
          email: profile.emails![0].value,
          name: profile.name!.familyName + " " + profile.name!.givenName,
          photo: profile.photos![0].value,
        };

        let newUser = await CreateUser(data);
        console.log(newUser);
        return done(null, newUser);
      }
      return done(null, undefined);
    }
  )
);
// tell passport how to serialize the user

passport.serializeUser((user: any, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  let user = await GetUser(id);
  return done(null, user);
});

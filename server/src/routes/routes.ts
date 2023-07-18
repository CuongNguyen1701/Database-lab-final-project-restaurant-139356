import e, { Router, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import passport from "passport";
// services
import {
  CreateUser,
  GetUser,
  GetAllUsers,
  UpdatePassword,
  DeleteUser,
} from "../controllers/user";
import {
  CreateItem,
  GetItem,
  GetAllItems,
  UpdateItem,
  DeleteItem,
  DeleteAllItems,
  SaveFancyItem,
} from "../controllers/item";
import {
  CreateOrderItem,
  DeleteOrderItem,
  GetAllOrderItems,
  GetAllOrderItemsAdmin,
} from "../controllers/order";
import {
  CreateBooking,
  DeleteBooking,
  GetAllBookings,
} from "../controllers/booking";
import { isAuthenticated, isAuthorized } from "../middlewares/checkAuth";
import { GetSearchItems } from "../services/search";

dotenv.config();
const router = Router();
const successLoginUrl: string = `${process.env.FRONTEND_URL}/login/success`;
const failureLoginUrl: string = `${process.env.FRONTEND_URL}/`;

// router.get("/auth/logout", (req: Request, res: Response) => {

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "select_account consent",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    // failureMessage: "Cannot login to Google",
    successRedirect: successLoginUrl,
    failureRedirect: failureLoginUrl,
  })
);
router.post(
  "/auth/signin",
  passport.authenticate("local", {
    // successRedirect: successLoginUrl,
    // failureRedirect: failureLoginUrl,
  }),
  async (req: Request, res: Response) => {
    console.log("Login successfully");
    const user: any = await GetUser(req.body.username);
    if (user) return res.status(200).json(user);
    console.log("Cannot login");
    return res.status(200).send(null);
  }
);
router.post("/auth/signup", async (req: Request, res: Response) => {
  const created: any = await CreateUser(req.body);
  if (created) return res.status(201).send(created);
  console.log("Cannot create user");
  return res.status(400).send(null);
});

router.get(
  "/api/current_user",
  isAuthenticated,
  (req: Request, res: Response) => {
    res.send(req.user);
  }
);
router.get(
  "/api/current_admin",
  isAuthenticated,
  isAuthorized,
  (req: Request, res: Response) => {
    res.send(req.user);
  }
);
router.get("/search/user/all", GetAllUsers);
router.post("/search/item", GetSearchItems);
router.get("/api/get_user/:id", async (req: Request, res: Response) => {
  try {
    const data = await GetUser;
    return res.status(201).json(data);
  } catch (err) {
    return res.status(401).json(err);
  }
});
router.delete("/api/delete_user/:id", isAuthenticated, DeleteUser);

router.get("/api/get_item/:item_id", GetItem);
router.get("/api/get_list_items/:page_id", GetAllItems);
//shoud be authenticated

router.post("/api/create_item", CreateItem);
router.delete(
  "/api/delete_item/:item_id",
  isAuthenticated,
  isAuthorized,
  DeleteItem
);
router.delete(
  "/api/delete_all_items",
  isAuthenticated,
  isAuthorized,
  DeleteAllItems
);
router.put(
  "/api/update_item/:item_id",
  isAuthenticated,
  isAuthorized,
  UpdateItem
);
router.get("/api/save_fancy_item/:item_id", isAuthenticated, SaveFancyItem);
router.delete(
  "/api/delete_fancy_item/:item_id",
  isAuthenticated,
  SaveFancyItem
);

//shoud be authenticated
router.post("/api/create_order", CreateOrderItem);
router.delete("/api/delete_order/:order_id", isAuthenticated, DeleteOrderItem);
router.get("/api/history/get_all_orders/:customer_id", GetAllOrderItems);

router.post("/api/create_booking", isAuthenticated, CreateBooking);
router.delete(
  "/api/delete_booking/:booking_id",
  isAuthenticated,
  DeleteBooking
);
router.get(
  "api/history/get_all_bookings/:page_id",
  isAuthenticated,
  GetAllBookings
);

router.get("/api/history/admin/get_all_orders", GetAllOrderItems);

export { router };

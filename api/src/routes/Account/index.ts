  
import express from "express";
import { handleError } from "../../utils/utils";
import AccountController from "./AccountController";
import { wrapAsync } from "../../utils/utils";
import { logRoutes } from "../../utils/logging";

const router = express.Router();

router.get("/", wrapAsync(AccountController.get));
router.post("/create", wrapAsync(AccountController.create));
router.post("/login", wrapAsync(AccountController.authorize));
router.post("/token", wrapAsync(AccountController.getFromToken));

logRoutes("/accounts", router);
router.use(handleError);

export default router;
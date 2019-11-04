  
import express from "express";
import { handleError } from "../../utils/utils";
import AccountController from "./AccountController";
import { wrapAsync } from "../../utils/utils";
import { logRoutes } from "../../utils/logging";

const router = express.Router();

router.post("", wrapAsync(AccountController.create));
router.post("/create", wrapAsync(AccountController.create));
router.post("/login", wrapAsync(AccountController.authorize));

logRoutes("/accounts", router);
router.use(handleError);

export default router;
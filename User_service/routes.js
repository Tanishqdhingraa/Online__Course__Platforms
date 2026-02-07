import express from "express";
import { signup,login ,logout} from "./controllers.js";
import { verifyUser } from "./authUser.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout",verifyUser, logout);

export default router;


// import { verifyUser } from "./middleware/authUser.js";

// router.get("/me", verifyUser, async (req, res) => {
//   const user = await User.findById(req.user.id).select("-password");
//   res.json(user);
// });

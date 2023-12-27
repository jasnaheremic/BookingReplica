import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
/*
router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("Zdravo korisnice! Prijava uspijesna!")
})

router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
    res.send("Zdravo korisnice, prijava uspijesna i mozete izbrisati svoj profil!")
})

router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("Zdravo admine, prijava uspijesna i mozete izbrisati sve profile!")
})
*/

//UPDATE

router.put("/:id",verifyUser, updateUser);
//DELETE

router.delete("/:id",verifyUser, deleteUser);

//GET


router.get("/:id",verifyUser, getUser);

//GET ALL


router.get("/", verifyAdmin, getUsers);

export default router


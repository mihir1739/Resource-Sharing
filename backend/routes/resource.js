const express = require("express");
const Resources = require("../models/resource");
const { handleResourceCreation,handleResourceDeletion,handleResourceUpdation } = require("../controllers/resource");

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) return res.redirect("/login");
    try {
        const resources = await Resources.find({ availability:  true }); // Retrieve all resources from the database
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving resources' });
    }
});
router.post("/create", handleResourceCreation);
router.delete("/delete/:id", handleResourceDeletion);
router.put("/update/:id", handleResourceUpdation);
router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
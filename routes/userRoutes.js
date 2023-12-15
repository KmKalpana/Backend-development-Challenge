// routes/userRoutes.js

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the user profile based on the provided userId.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user.
 *     responses:
 *       '200':
 *         description: Successful response with the user profile.
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id: 123
 *                 username: ExampleUser
 *                 email: example@example.com
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 */

/**
 * @swagger
 * /api/user/{userId}:
 *   put:
 *     summary: Update user profile
 *     description: Update the user profile based on the provided userId.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user.
 *     responses:
 *       '200':
 *         description: Successful response with the updated user profile.
 *         content:
 *           application/json:
 *             example:
 *               message: User profile updated successfully
 *               user:
 *                 id: 123
 *                 username: UpdatedUser
 *                 email: updated@example.com
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/:userId", authMiddleware, userController.getUserProfile);
router.put("/:userId", authMiddleware, userController.updateUserProfile);

module.exports = router;

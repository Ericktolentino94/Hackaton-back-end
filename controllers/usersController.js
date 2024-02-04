const express = require("express")
const users = express.Router()
const {
    getAllUsers,
    getOneUser,
    deleteUser,
    createUser,
    updateUser
} = require("../queries/users")
const {

} = require("../validations/checkUsers")

const placesController = require("./placesController.js")
users.use("/:user_id/placess", placesController)

users.get("/", async (req, res) => {
    try {
        const allUsers = await getAllUsers()
        res.status(200).json(allUsers)
    }
    catch (error) {
        res.status(400).json({ error: `${error}, error in index controller path.` })
    }
})

users.get("/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params
        const user = await getOneUser(user_id)
        res.status(200).json(user)
    }
    catch (error) {
        res.status(400).json({ error: `${error}, error in show controller path` })
    }
})

users.delete("/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const deletedUser = await deleteUser(user_id)
        if (deletedUser)
            res.status(200).json({ success: true, deletedUser })
        else
            res.status(404).json({ error: `User not found.` })

    } catch (error) {
        res.status(400).json({ error: `${error}, error in delete controller path` })
    }
})

users.post("/", async (req, res) => {
        try {
            const user = req.body;
            const userAdded = await createUser(user)
            res.status(200).json(userAdded)
        }
        catch (error) {
            res.status(400).json({ error: `${error},  error in new controller path` })
        }
    }
)

users.put("/:user_id", async (req, res) => {
        try {
            const { user_id } = req.params
            const user = req.body
            const updatedUser = await updateUser(user_id, user)
            if (updatedUser.user_id) {
                res.status(200).json(updatedUser)
            } else {
                res.status(400).json({ error: `User not found.` })
            }
        }
        catch (error) {
            res.status(400).json({ error: `${error}, error in update controller path` })
        }
    }
)


module.exports = users

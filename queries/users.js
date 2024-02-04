const db = require(`../db/dbConfig.js`)

const getAllUsers = async () => {
    try {
        const allUsers = await db.any(`SELECT * FROM users`)
        return allUsers
    }
    catch (err) {
        return { err: `${err}, sql query error - get all users` }
    }
}

const getOneUser = async (user_id) => {
    try {
        const oneUser = await db.one(`SELECT * FROM users WHERE user_id=$1`, user_id)
        return oneUser
    }
    catch (err) {
        return { err: `${err}, sql query error - get one user` }
    }
}

const deleteUser = async (user_id) => {
    try {
        const deletedUser = await db.one(
            `DELETE FROM users WHERE user_id=$1 RETURNING *`,
            user_id
        )
        return deletedUser
    }
    catch (err) {
        return { err: `${err}, sql query error - delete a user` }
    }
}

const createUser = async (user) => {
    try {
        const { displayname, email } = user
        const newUser = await db.one(
            `INSERT INTO users(displayname, email)` +
            ` VALUES($1, $2) RETURNING *`,
            [displayname, email]
        )
        return newUser
    }
    catch (err) {
        return { err: `${err}, sql query error - create a user` }
    }
}

const updateUser = async (user_id, user) => {
    try {
        const { displayname, email  } = user
        const updatedUser = await db.one(
            `UPDATE users SET displayname=$1, email=$2,` +
            ` WHERE user_id=$3 RETURNING *`,
            [displayname, email, user_id]
        )
        return updatedUser
    }
    catch (err) {
        return { err: `${err}, sql query error - update a user` }
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    deleteUser,
    createUser,
    updateUser
}

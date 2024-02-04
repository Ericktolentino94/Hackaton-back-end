const db = require(`../db/dbConfig.js`)

const getAllPlaces = async (user_id) => {
    try {
        const allPlaces = await db.any(`SELECT * FROM places WHERE user_id=$1`,
            user_id)
        return allPlaces
    }
    catch (err) {
        return { err: `${err}, sql query error - get all places` }
    }
}

const getOnePlace = async (place_id) => {
    try {
        const onePlace = await db.any(`SELECT * FROM places WHERE place_id=$1`, place_id)
        return onePlace
    }
    catch (err) {
        return { err: `${err}, sql query error - get one place` }
    }
}

const deletePlace = async (place_id) => {
    try {
        const deletedPlace = await db.one(`DELETE FROM places WHERE place_id=$1 RETURNING *`, place_id)
        return deletedPlace
    } catch (err) {
        return { err: `${err}, sql query error - delete a place` }
    }
}

const createPlace = async (place) => {
    try {
        const { name, vicinity, rating, opening_hours,
            icon, user_id } = place
        const newPlace = await db.one(`INSERT INTO places(name, vicinity,` +
            ` rating, opening_hours, icon, user_id)` +
            ` VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, vicinity, rating, opening_hours,
                icon, user_id]
        )
        return newPlace
    } catch (err) {
        return { err: `${err}, sql query error - create a place` }
    }
}

const updatePlace = async (place_id, place) => {
    try {
        const { name, vicinity, rating,
            opening_hours, icon } = place
        const updatedPlace = await db.one(`UPDATE places SET name=$1,` +
            ` vicinity=$2, rating=$3, opening_hours=$4 WHERE place_id=$6 RETURNING *`,
            [name, vicinity, rating, opening_hours, icon, place_id]
        )
        return updatedPlace
    } catch (err) {
        return { err: `${err}, sql query error - updated a place` }
    }
}


module.exports = {
    getAllPlaces,
    getOnePlace,
    deletePlace,
    createPlace,
    updatePlace
}
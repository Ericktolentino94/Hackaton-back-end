const express = require("express")
const places = express.Router({ mergeParams: true })
const { getOneUser } = require("../queries/users")

const { getAllplaces,
    getOnePlace,
    deletePlace,
    createPlace,
    updatePlace
} = require("../queries/places")
const {
} = require("../validations/checkPlaces.js")


places.get("/", async (req, res) => {
    try {
        const { user_id } = req.params
        const user = await getOneUser(user_id)
        let allPlaces = await getAllPlaces(user_id)
        res.status(200).json({ ...user, allPlaces })
    }
    catch (error) {
        res.status(400).json({
            error: `${error}, error in index` +
                ` controller path for places.`
        })
    }
})

places.get("/:place_id", async (req, res) => {
    try {
        const { user_id, place_id } = req.params
        const place = await getOnePlace(place_id)
        res.status(200).json(place)
    }
    catch (error) {
        res.status(400).json({
            error: `${error}, error in show` +
                ` controller path for places`
        })
    }
})

places.delete("/:place_id", async (req, res) => {
    try {
        const { place_id } = req.params
        const deletedPlace = await deletePlace(place_id)
        if (deletedPlace) {
            res.status(200).json(deletedPlace)
        } else {
            res.status(404).json({ error: "Place not found." })
        }
    }
    catch (error) {
        res.status(400).json({
            error: `${error}, error in delete` +
                ` controller path for places`
        })
    }
})

places.post("/", async (req, res) => {
        try {
            const { user_id } = req.params
            const user = await getOneUser(user_id)
            const placeData = req.body
            placeData.user_id = user_id
            const newPlace = await createPlace(placeData)
            res.status(200).json(newPlace)
        }
        catch (error) {
            res.status(400).json({
                error: `${error}, error in new` +
                    ` controller path for places`
            })
        }
    }
)

places.put("/:place_id", async (req, res) => {
        try {
            const { place_id } = req.params
            const updatedPlaceData = req.body
            const updatedPlace = await updatePlace(place_id, updatedPlaceData)
            res.status(200).json(updatedPlace)
        }
        catch (error) {
            res.status(400).json({
                error: `${error}, error in update` +
                    ` controller path for place`
            })
        }
    }
)


module.exports = places
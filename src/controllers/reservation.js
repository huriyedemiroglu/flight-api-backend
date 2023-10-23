"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:

const Passenger = require('../models/passenger')
const Reservation = require('../models/reservation')

module.exports = {

    list: async (req, res) => {
        

        const data = await res.getModelList(Reservation, {}, 'passengers')

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Reservation),
            data
        })
    },

    create: async (req, res) => {
        
        
        /* Check ID or OBJECT for passengers */

        let passengerInfos = req.body?.passengers || [],
            passengerIds = [],
            passenger = false;

        for (let passengerInfo of passengerInfos) {

            Object.assign(passengerInfo, { createdId: req.user?._id })

            if (typeof passengerInfo == "object") {

                passenger = await Passenger.findOne({ email: passengerInfo.email })
                if (!passenger) passenger = await Passenger.create(passengerInfo)

            } else {

                passenger = await Passenger.findOne({ _id: passengerInfo })
            }

            if (passenger) passengerIds.push(passenger._id)
        }

        /* Check ID or OBJECT for passengers */

        // Doğrulanmış ID'leri passengers'a aktar:
        req.body.passengers = passengerIds

        const data = await Reservation.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */

        const data = await Reservation.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    
        

        

    
}
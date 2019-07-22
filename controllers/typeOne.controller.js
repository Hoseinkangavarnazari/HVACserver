
var TypeOne = require('../models/typeOne.model');
var { DateTime } = require('luxon');



// Display detail page for a specific Author.

exports.statusCycle = async (req, res) => {

    console.log(":::", "Received an unprocessed message. [statusCycle::TypeOne endPoint]")

    // define schema here
    let ID;
    let date;
    let status = {};

    //  parsing incoming data ------------------------------------------------
    if (req.body.ID && req.body.date && req.body.status) {

        date = req.body.date;
        console.log("::::before convert DATE::::", date);
        date = new Date(date + 'Z');
        console.log("::::After convert DATE::::", date);

        ID = req.body.ID;
        status.avgTemperature = req.body.status.avgTemperature;
        status.avgHumidity = req.body.status.avgHumidity;
        status.avgCO2 = req.body.status.avgCO2;

        console.log(status)

        // find it or create one 

        console.log(":::", `The requested  ID is : ${ID}`)
    } else {
        throw new Error("::: There is something wrong with the input value.")
    }

    try {
        // newNode.save();
        res.send(DateTime.local().toISO().substring(0, DateTime.local().toISO().lastIndexOf("") - 6));
        console.log("::: Saved into the database.")

    } catch (err) {
        res.send("::: There is something wrong with saving to DB");
        console.log("::: There is something wrong with saving to DB")
    }
}


exports.MLCycle = async (req, res) => {

    console.log(":::", "Received an unprocessed message. [MLCycle::TypeOne endPoint]")
    // define schema here
    let ID;
    let date;
    let status;

    //  parsing incoming data ------------------------------------------------
    if (req.body.ID && req.body.date && req.body.status) {

        // convert Time Standard
        date = req.body.date;
        date = new Date(date + 'Z');
        status = req.body.status
        ID = req.body.ID
        dbFriendlydate = req.body.date.toString().split(" ")[0]

        _typeOne = await TypeOne.find({
            $and: [
                { date: dbFriendlydate },
                { ID: ID }
            ]
        })

        console.log(_typeOne);

        if (_typeOne.length) {
            // do the update

            console.log("Update the type one.");

            TypeOne.update(
                {
                    $and: [
                        { date: dbFriendlydate },
                        { ID: ID }
                    ]
                }, 
                { $push: { MVdata: {
                    date: req.body.date.toString(),
                    status: status
                } } },
                ()=>{
                    console.log("Successfully Done!");
                }
            );

        
        }
        else {
            // create newOne
            console.log("Create new type One");
            console.log(req.body.date.toString());
            tempTypeOne = new TypeOne({
                ID: ID,
                date: dbFriendlydate,
                sensorData: [],
                MVdata: [
                    {
                        status: status,
                        date: req.body.date.toString()
                    }
                ]

            });

            tempTypeOne.save()
        }

    } else {
        throw new Error("::: There is something wrong with the input value.")
    }

    try {

        // newNode.save();
        res.send(DateTime.local().toISO().substring(0, DateTime.local().toISO().lastIndexOf("") - 6));
        console.log("::: Saved into the database.")

    } catch (err) {
        res.send("::: There is something wrong with saving to DB");
        console.log("::: There is something wrong with saving to DB")
    }

}
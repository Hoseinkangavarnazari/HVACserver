
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
        date = new Date(date +'Z');
        console.log("::::After convert DATE::::" , date );



        ID = req.body.ID;
        status.avgTemperature = req.body.status.avgTemperature;
        status.avgHumidity = req.body.status.avgHumidity; 
        status.avgCO2 = req.body.status.avgCO2;  

        console.log(status)
        // status.avgHumidity = req.body.status.avgHumidity; 
        // status.avgCO2 = req.body.status.avgCO2;  

        console.log(":::", `The requested  ID is : ${ID}`)
    } else {
        throw new Error("::: There is something wrong with the input value.")
    }
    // ------------------------------------------------------------------------

    // regex check should be here

    // check for duplicates ---------------------------------------------------

    //  validity= await Node.find({ ID: ID })

    //  if not valid do not accept the request



    // ------------------------------------------------------------------------

    //  age hast ke hichi age nist create kon yedone jadid

    // var newTypeOne = new TypeOne({
    //     Date:
    //     ID: ID,
    // });
    try {
        // newNode.save();
        res.send(d);
        console.log(":::  Saved into the database.")

    } catch (err) {
        res.send("::: There is something wrong with saving to DB");
        console.log("::: There is something wrong with saving to DB")
    }
}


exports.dynamicLearningCycle = async (req, res) => {

    console.log(":::", "Received an unprocessed message. [dynamicLearningCycle::TypeOne endPoint]")


}
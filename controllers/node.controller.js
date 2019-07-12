
var Node = require('../models/node.model');




// Display detail page for a specific Author.

exports.addNode = async (req, res) => {
    console.log(":::", "Received an unprocessed message. [AddNode EndPoint]")
    // define schema here
    let IP;
    let ID;
    //  parsing incoming data ------------------------------------------------
    if (req.body.IP && req.body.ID) {
        IP = req.body.IP;
        ID = req.body.ID;
        console.log(":::", `The requested IP is ${IP} , The ID is : ${ID}`)
    } else {
        throw new Error("::: There is something wrong with the input value.")
    }
    // ------------------------------------------------------------------------

    // regex check should be here

    // check for duplicates ---------------------------------------------------

    duplicate = await Node.find({
        $or: [
            { IP: IP },
            { ID: ID }
        ]
    })

    if (duplicate.length > 0) {
        res.send("Cannot register requested Node. The Node spec is duplicated");
        console.log("::: Cannot register requested Node. The Node spec is duplicated")
        return
    }

    // ------------------------------------------------------------------------

    var newNode = new Node({
        IP: IP,
        ID: ID,
    });
    try {
        newNode.save();
        res.send("::: Saved into the database.");
        console.log(":::  Saved into the database.")

    } catch (err) {
        res.send("::: There is something wrong with saving to DB");
        console.log("::: There is something wrong with saving to DB")
    }
}


// Display list of all Authors.
exports.getStatus = async (req, res) => {
    console.log(":::", "Received an unprocessed message. [getStatus EndPoint]")
    // define schema here
    let ID;
    //  parsing incoming data ------------------------------------------------
    if (req.body.ID) {
        ID = req.body.ID;
        console.log(":::", `The requested status is for  ID ${ID}`)
    } else {
        throw new Error("::: There is something wrong with the input value.")
    }
    // ------------------------------------------------------------------------


    // check for duplicates ---------------------------------------------------

    resultNode = await Node.findOne({ ID: ID })


    if (resultNode) {
        res.send(resultNode.nodeStatus);
        console.log(`:::${resultNode.nodeStatus}`);
        return
    } else {
        res.send(`Requested node ${ID} not found in system`)
    }

};


exports.deleteNode = async (req, res) => {
    console.log(":::", "Received an unprocessed message. [getStatus EndPoint]")
    // define schema here
    let ID;


    //  parsing incoming data ------------------------------------------------
    try {
        if (req.body.ID) {
            ID = req.body.ID;
            console.log(":::", `The requested status is for  ID ${ID}`)
        } else {
            // throw new Error("::: There is something wrong with the input value.")
            console.log("::: Invalid message format")
        }
    } catch (e) {
        console.log(`Error ${e}`)
    }
    // ------------------------------------------------------------------------


    // check for duplicates ---------------------------------------------------

    try {
        resultNode = await Node.findOneAndDelete({ ID: ID })
    } catch (e) {
        console.log(":::", e)
    }


    if (resultNode) {
        console.log(`::: Removed successfully`);
        res.send("::: Removed successfully")
        return
    } else {
        res.send(`Requested node ${ID} not found in system`)
    }

}


exports.updateSetpoint = async (req, res) => {
    console.log(":::", "Received an unprocessed message. [updateSetpoint EndPoint]")
    // define schema here
    let ID;
    let setpoint;
    let status;
    //  parsing incoming data ------------------------------------------------

    // here setpoint cannot be zero error *******************
    if (req.body.ID && req.body.setpoint && req.body.status) {
        ID = req.body.ID;
        setpoint = req.body.setpoint;
        status = req.body.status;

        // validity check for setpoint  will be added here

        console.log(":::", `The requested status is for  ID ${ID}`)
    } else {
        throw new Error("::: There is something wrong with the input value.")
    }
    // ------------------------------------------------------------------------


    // check for duplicates ---------------------------------------------------

    resultNode = await Node.findOneAndUpdate({ ID: ID }, {
        nodeStatus: {
            status: status,
            setPoint: setpoint
        }
    },
        { useFindAndModify: false }
    )


    if (resultNode) {
        resultNode = await Node.findOne({ ID: ID });
        //zero has the error
        res.send(resultNode);
        console.log(`:::${resultNode}`);
        return
    } else {
        res.send(`Requested node ${ID} not found in system`)
    }
}


var Node = require('../models/node.model');




// Display detail page for a specific Author.
// I don't no it either connected to a post request or get request 
exports.addNewNode = function (req, res) {
    /*
    querys I am expected is IP address and Id Name
    */

    // console.log(req.query.name);
    // newNode = new Node({
    //     nodeName: req.query.name,
    //     nodeID: "2190830714",
    //     nodeStatus: {
    //         status: true,
    //         setPoint: 23
    //     },
    //     body: "something just for test",
    //     feedbackBan: false
    // });

    // try {
    //     newNode.save();
    //     res.send("everything is ok");

    // } catch (err) {
    //     res.send("something went wrong");
    // }

};


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
    } catch(e){
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

}


var Node = require('../models/node.model');



// Display list of all Authors.
exports.getStatus = function (req, res) {
    res.send({
        type: "Status",
        setpoint: 12,
        condition: "good"
    });
};

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


exports.addNode = (req, res) => {
    console.log(":::", "Received an unprocessed message. [AddNode EndPoint]")
    // define schema here
    let IP;
    let ID;

    // parse the incoming data 
    if (req.body.IP && req.body.ID) {
        IP = req.body.IP;
        ID = req.body.ID;
        console.log(":::", `The requested IP is ${IP} , The ID is : ${ID}`)
    } else {
        throw new Error("::: There is something wrong with the input value.")
    }

    var newNode = new node({
        nodeName: req.query.name,
        nodeID: "2190830714",
        nodeStatus: {
            status: true,
            setPoint: 23
        },
        body: "something just for test",
        feedbackBan: false
    });

    try {
        newNode.save();
        res.send("everything is ok");

    } catch (err) {
        res.send("something went wrong");
    }

}
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
exports.addNewNode = function (req, res) {

    newNode = new Node({
        nodeName: "A12",
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


}; 
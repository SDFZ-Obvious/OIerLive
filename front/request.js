const axios = require("axios"),
    qs = require("qs"),
    util = require("./util.js");

const head = { "Content-Type": "application/x-www-form-urlencoded" };

exports.post = async (data) => {
    await axios({
        method: "POST",
        url: util.read_config().server,
        headers: head,
        data: qs.stringify(data)
    }).then((res) => {
        util.log("Received response!");
    }).catch((err) => {
        util.log("Can't connect to the server!")
        // console.error(err);
    });
};
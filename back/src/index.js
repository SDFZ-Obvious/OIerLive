const fs = require("fs"),
    path = require("path"),
    qs = require("qs"),
    render = require("./render.js"),
    util = require("./util.js");
let image;
let note;
let lastupdate = new Date().getTime();

const post = (context) => {
    const img = context["image"],
        txt = context["text"],
        pw = context["password"];
    console.log(util.read_config().password);
    console.log(pw);
    if (util.read_config().password === pw) {
        image = img;
        note = txt;
        lastupdate = new Date().getTime()
        return {
            isBase64Encoded: false,
            statusCode: 200,
            headers: { "Content-Type": "text/html" },
            body: "Success"
        };
    }
};

const img = () => {
    if (!note) note = "暂无笔记";
    if (new Date().getTime() - lastupdate >= util.read_config().expire) {
        image = "offline";
    } else {
        if (!image) image = "";
    }
    
    return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"note": note, "image": image})
    };
};

const live = async () => {
    let html = fs.readFileSync(path.resolve(__dirname, "./demo.html"), {
        encoding: "utf-8"
    })
    html = render(html, {
        imagedata: image,
        notedata: note,
        interval: util.read_config().interval,
        offline: util.read_config().offline
    });
    return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: html
    };
}

exports.main_handler = async (event, context, callback) => {
    await util.load_config();
    console.log(event)
    const request_path = event["path"];
    if (request_path === "/post") {
        return post(qs.parse(event["body"]));
    }
    if (request_path === "/image" || request_path === "/live/image") {
        return img();
    }
    if (request_path === "/live") {
        return live();
    }
};
const fs = require("fs/promises"),
    path = require("path"),
    screenshot = require("screenshot-desktop"),
    images = require("images"),
    util = require("./util.js"),
    request = require("./request.js");

const shot = async () => {
    util.log("Screenshoting...");
    const dir = __dirname + "/live/screenshot.jpg";
    await screenshot({ filename: dir });
    images(dir).save(dir, {quality: 50});
    const image_data = (await fs.readFile(dir, {flag: 'r'})).toString("base64");
    const note = (await fs.readFile(__dirname + "/live/note.txt", encoding = "utf-8"));
    util.log("Syncing data...");
    await request.post({ password: util.read_config().password, image: image_data, text: note});
}

const main = async () => {
    await util.load_config();
    setInterval(shot, util.read_config().interval);
}
main();
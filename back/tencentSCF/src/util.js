const fs = require("fs");

let config;
const load_config = async () => {
    config = JSON.parse(await fs.promises.readFile(__dirname + "/config.json", "utf-8"));
};
const read_config = () => { return config };
exports.read_config = read_config;
exports.load_config = load_config;
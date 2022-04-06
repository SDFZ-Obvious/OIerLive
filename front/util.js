const fs = require("fs/promises");

const log = (f, ...s) => console.log(`%c[OIerLive Client] ${f}`, "color: #0e90d2;", ...s);
exports.log = log;

let config;
const load_config = async () => {
    config = JSON.parse(await fs.readFile(__dirname + "/config.json", "utf-8"));
};
const read_config = () => { return config }
exports.read_config = read_config;
exports.load_config = load_config;
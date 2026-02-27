"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_js_1 = require("./presentation/menu.js");
async function main() {
    const menu = new menu_js_1.Menu();
    await menu.start();
}
main();

import { ConsoleMenu } from "./ConsoleMenu";

async function main() {
    const menu = new ConsoleMenu();
    await menu.run();
}

main().catch(err => {
    console.error("Fatal error:", err);
    process.exit(1);
});

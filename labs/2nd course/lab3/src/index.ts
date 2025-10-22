import { Menu } from './presentation/menu.js'

async function main() {
    const menu = new Menu()
    await menu.start()
}

main()

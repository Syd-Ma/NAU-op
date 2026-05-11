import { resolve } from "node:path";
import { MuseumService } from "./bll/services/museumService.js";
import { JsonDataContext } from "./dal/storage/jsonDataContext.js";
import { JsonUnitOfWork } from "./dal/unitOfWork/jsonUnitOfWork.js";
import { ConsoleApp } from "./presentation/consoleApp.js";
async function bootstrap() {
    const databasePath = resolve(process.cwd(), "data", "museum-db.json");
    const dataContext = new JsonDataContext(databasePath);
    const unitOfWork = await JsonUnitOfWork.create(dataContext);
    const museumService = new MuseumService(unitOfWork);
    const app = new ConsoleApp(museumService);
    await app.run();
}
bootstrap().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

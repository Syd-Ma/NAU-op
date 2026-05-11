import { resolve } from "node:path";
import { MuseumService } from "./bll/services/museumService.ts";
import { JsonDataContext } from "./dal/storage/jsonDataContext.ts";
import { JsonUnitOfWork } from "./dal/unitOfWork/jsonUnitOfWork.ts";
import { ConsoleApp } from "./presentation/consoleApp.ts";

async function bootstrap(): Promise<void> {
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

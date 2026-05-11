import { createInterface, Interface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { IMuseumService } from "../bll/contracts/museumService.ts";
import { Exhibition } from "../bll/models/exhibition.ts";
import { ExhibitionSession } from "../bll/models/exhibitionSession.ts";
import { PlannedTour } from "../bll/models/plannedTour.ts";

type MenuAction = () => Promise<void>;

export class ConsoleApp {
  private readonly readline: Interface = createInterface({ input, output });

  constructor(private readonly museumService: IMuseumService) {}

  async run(): Promise<void> {
    console.clear();
    console.log("Museum management console app.\n");

    let shouldExit = false;
    while (!shouldExit) {
      this.printMainMenu();
      const choice = await this.ask("Choose action");

      const actions: Record<string, MenuAction | undefined> = {
        "1": () => this.showAllExhibitions(),
        "2": () => this.searchExhibitions(),
        "3": () => this.showSessionsByDate(),
        "4": () => this.planPersonalVisit(),
        "5": () => this.showPlannedToursByDate(),
        "6": () => this.bookPlannedTour(),
        "7": () => this.requestCustomTour(),
        "8": () => this.showCustomRequests(),
        "0": async () => {
          shouldExit = true;
        }
      };

      const action = actions[choice];
      if (!action) {
        console.log("Unknown command.\n");
        continue;
      }

      try {
        await action();
      } catch (error) {
        this.printError(error);
      }
    }

    this.readline.close();
  }

  private printMainMenu(): void {
    console.log("=== Main Menu ===");
    console.log("1. Show all exhibitions");
    console.log("2. Search exhibitions");
    console.log("3. Show sessions by date");
    console.log("4. Plan personal visit");
    console.log("5. Show planned tours by date");
    console.log("6. Book planned tour");
    console.log("7. Request custom tour");
    console.log("8. Show custom tour requests");
    console.log("0. Exit");
  }

  private async showAllExhibitions(): Promise<void> {
    const exhibitions = await this.museumService.getAllExhibitions();
    console.log("\n=== Exhibitions ===");
    if (exhibitions.length === 0) {
      console.log("No exhibitions found.\n");
      return;
    }

    this.printExhibitions(exhibitions);
    console.log("");
  }

  private async searchExhibitions(): Promise<void> {
    const theme = await this.askOptional("Theme filter");
    const targetAudience = await this.askOptional("Target audience filter");
    const exhibitions = await this.museumService.findExhibitions(theme, targetAudience);

    console.log("\n=== Search Result ===");
    if (exhibitions.length === 0) {
      console.log("No exhibitions matched the filters.\n");
      return;
    }

    this.printExhibitions(exhibitions);
    console.log("");
  }

  private async showSessionsByDate(): Promise<void> {
    const date = await this.askNonEmpty("Exhibition date (YYYY-MM-DD)");
    const sessions = await this.museumService.getSessionsByDate(date);

    console.log(`\n=== Sessions on ${date} ===`);
    if (sessions.length === 0) {
      console.log("No sessions found for this date.\n");
      return;
    }

    this.printSessions(sessions);
    console.log("");
  }

  private async planPersonalVisit(): Promise<void> {
    const visitorName = await this.askNonEmpty("Visitor name");
    const date = await this.askNonEmpty("Planned date (YYYY-MM-DD)");
    const sessions = await this.museumService.getSessionsByDate(date);

    if (sessions.length === 0) {
      console.log("No sessions are available for this date.\n");
      return;
    }

    console.log("\nAvailable sessions:");
    this.printSessions(sessions);
    const selectedIds = await this.askSelectionList(
      "Enter session numbers separated by comma",
      sessions.length
    );

    const plan = await this.museumService.planPersonalVisit({
      visitorName,
      sessionIds: selectedIds.map((index) => sessions[index].id)
    });

    console.log("\n=== Personal Visit Plan ===");
    console.log(`Visitor: ${plan.visitorName}`);
    console.log(`Date: ${plan.plannedDate}`);
    console.log(`Route: ${plan.routeSummary}`);
    console.log(`Total cost: ${plan.totalCost}`);
    console.log("");
  }

  private async showPlannedToursByDate(): Promise<void> {
    const date = await this.askNonEmpty("Tour date (YYYY-MM-DD)");
    const tours = await this.museumService.getPlannedToursByDate(date);

    console.log(`\n=== Planned Tours on ${date} ===`);
    if (tours.length === 0) {
      console.log("No planned tours found for this date.\n");
      return;
    }

    this.printTours(tours);
    console.log("");
  }

  private async bookPlannedTour(): Promise<void> {
    const visitorName = await this.askNonEmpty("Visitor name");
    const date = await this.askNonEmpty("Tour date (YYYY-MM-DD)");
    const tours = await this.museumService.getPlannedToursByDate(date);

    if (tours.length === 0) {
      console.log("No planned tours are available for this date.\n");
      return;
    }

    console.log("\nAvailable tours:");
    this.printTours(tours);

    const tourIndex = await this.askIndex("Choose tour number", tours.length);
    const visitorsCount = await this.askPositiveNumber("Visitors count");
    const updatedTour = await this.museumService.bookPlannedTour({
      visitorName,
      plannedTourId: tours[tourIndex].id,
      visitorsCount
    });

    console.log("\n=== Booking Completed ===");
    console.log(`Tour: ${updatedTour.title}`);
    console.log(`Remaining free places: ${updatedTour.freePlaces}`);
    console.log("");
  }

  private async requestCustomTour(): Promise<void> {
    const visitorName = await this.askNonEmpty("Visitor or group name");
    const requestedDate = await this.askNonEmpty("Requested date (YYYY-MM-DD)");
    const participantsCount = await this.askPositiveNumber("Participants count");
    const exhibitions = (await this.museumService.getAllExhibitions()).filter((item) => item.supportsGuidedTour);

    if (exhibitions.length === 0) {
      console.log("No exhibitions support guided tours right now.\n");
      return;
    }

    console.log("\nAvailable exhibitions for guided tour:");
    this.printExhibitions(exhibitions);
    const selectedIds = await this.askSelectionList(
      "Enter exhibition numbers separated by comma",
      exhibitions.length
    );

    const request = await this.museumService.requestCustomTour({
      visitorName,
      requestedDate,
      exhibitionIds: selectedIds.map((index) => exhibitions[index].id),
      participantsCount
    });

    console.log("\n=== Custom Tour Request Created ===");
    console.log(`Visitor: ${request.visitorName}`);
    console.log(`Date: ${request.requestedDate}`);
    console.log(`Exhibitions: ${request.exhibitionTitles.join(", ")}`);
    console.log(`Participants: ${request.participantsCount}`);
    console.log(`Estimated price: ${request.estimatedPrice}`);
    console.log(`Status: ${request.status}`);
    console.log("");
  }

  private async showCustomRequests(): Promise<void> {
    const requests = await this.museumService.getCustomTourRequests();

    console.log("\n=== Custom Tour Requests ===");
    if (requests.length === 0) {
      console.log("No custom tour requests found.\n");
      return;
    }

    requests.forEach((request, index) => {
      console.log(
        `${index + 1}. ${request.visitorName} | date: ${request.requestedDate} | exhibitions: ${request.exhibitionTitles.join(", ")} | participants: ${request.participantsCount} | estimated price: ${request.estimatedPrice} | status: ${request.status}`
      );
    });
    console.log("");
  }

  private printExhibitions(exhibitions: Exhibition[]): void {
    exhibitions.forEach((exhibition, index) => {
      console.log(
        `${index + 1}. ${exhibition.title} | theme: ${exhibition.theme} | audience: ${exhibition.targetAudience} | hall: ${exhibition.hall} | ticket: ${exhibition.baseTicketPrice} | guided tour: ${exhibition.supportsGuidedTour ? "yes" : "no"}`
      );
    });
  }

  private printSessions(sessions: ExhibitionSession[]): void {
    sessions.forEach((session, index) => {
      console.log(
        `${index + 1}. ${session.exhibitionTitle} | ${session.exhibitionDate} | ${session.opensAt}-${session.closesAt}`
      );
    });
  }

  private printTours(tours: PlannedTour[]): void {
    tours.forEach((tour, index) => {
      console.log(
        `${index + 1}. ${tour.title} | ${tour.exhibitionTitle} | ${tour.exhibitionDate} ${tour.startsAt} | duration: ${tour.durationMinutes} min | free places: ${tour.freePlaces} | price: ${tour.pricePerVisitor}`
      );
    });
  }

  private async ask(prompt: string): Promise<string> {
    return (await this.readline.question(`${prompt}: `)).trim();
  }

  private async askNonEmpty(prompt: string): Promise<string> {
    while (true) {
      const value = await this.ask(prompt);
      if (value.length > 0) {
        return value;
      }

      console.log("Value cannot be empty.");
    }
  }

  private async askOptional(prompt: string): Promise<string | undefined> {
    const value = await this.ask(`${prompt} (leave empty to skip)`);
    return value.length > 0 ? value : undefined;
  }

  private async askPositiveNumber(prompt: string): Promise<number> {
    while (true) {
      const value = Number(await this.ask(prompt));
      if (Number.isInteger(value) && value > 0) {
        return value;
      }

      console.log("Enter a positive integer.");
    }
  }

  private async askIndex(prompt: string, length: number): Promise<number> {
    while (true) {
      const value = Number(await this.ask(prompt));
      if (Number.isInteger(value) && value >= 1 && value <= length) {
        return value - 1;
      }

      console.log("Choose a valid number from the list.");
    }
  }

  private async askSelectionList(prompt: string, length: number): Promise<number[]> {
    while (true) {
      const raw = await this.ask(prompt);
      const parts = raw
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      const parsed = parts.map((item) => Number(item));
      const areValid =
        parsed.length > 0 &&
        parsed.every((item) => Number.isInteger(item) && item >= 1 && item <= length);

      if (!areValid) {
        console.log("Enter one or more valid numbers separated by comma.");
        continue;
      }

      return [...new Set(parsed.map((item) => item - 1))];
    }
  }

  private printError(error: unknown): void {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}\n`);
      return;
    }

    console.log("Unknown error.\n");
  }
}

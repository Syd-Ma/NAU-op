import { ICooks } from "./ICooks"

export class Dentist implements ICooks {
    cook(dish: string, ingredients: string[]): string {
        return ingredients.length >= 1 ? `Страва ${dish} приготована` : "Немає інгредієнтів"
    }
}

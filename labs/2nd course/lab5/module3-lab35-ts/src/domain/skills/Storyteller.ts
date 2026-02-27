import { ICooks } from "./ICooks"
import { IEntertainsChildren } from "./IEntertainsChildren"

export class Storyteller implements ICooks, IEntertainsChildren {
    entertainChildren(required: string[], available: string[]): boolean {
        const set = new Set(available)
        return required.every(r => set.has(r))
    }

    cook(dish: string, ingredients: string[]): string {
        return ingredients.length >= 2 ? `Готово: ${dish}` : "Бракує інгредієнтів"
    }
}

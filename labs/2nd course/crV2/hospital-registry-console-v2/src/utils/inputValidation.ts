export function requireNonEmpty(input: string, fieldName: string): string {
    const value = input.trim();
    if (!value) {
        throw new Error(`Поле "${fieldName}" не може бути порожнім`);
    }
    return value;
}

export function requirePhone(input: string): string {
    const trimmed = input.trim();
    if (!/^\+?\d{7,15}$/.test(trimmed)) {
        throw new Error("Невірний формат телефону");
    }
    return trimmed;
}

export function requireDateTime(input: string): string {
    const trimmed = input.trim();
    const date = new Date(trimmed);
    if (isNaN(date.getTime())) {
        throw new Error("Невірний формат дати/часу (очікується ISO, наприклад 2025-11-18T10:00)");
    }
    return trimmed;
}

import inquirer from 'inquirer'
export class InputHelper {
    static async ask(message: string): Promise<string> {
        const { answer } = await inquirer.prompt({ type: 'input', name: 'answer', message })
        return answer
    }
}
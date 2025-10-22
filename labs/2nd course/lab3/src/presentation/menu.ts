import inquirer from 'inquirer'
import { InputHelper } from './helpers/InputHelper.js'
import { StudentService } from '../bll/services/StudentService.js'
import { EntityContext } from '../dal/context/EntityContext.js'
import { JsonProvider } from '../dal/providers/JsonProvider.js'
import { XmlProvider } from '../dal/providers/XmlProvider.js'
import { BinaryProvider } from '../dal/providers/BinaryProvider.js'
import { CustomProvider } from '../dal/providers/CustomProvider.js'

export class Menu {
    async start() {
        const { type } = await inquirer.prompt({
            type: 'list',
            name: 'type',
            message: 'Select serialization type',
            choices: ['JSON', 'XML', 'Binary', 'Custom']
        })

        const filePath =
            (await InputHelper.ask('Enter file path (наприклад, students.json):')) ||
            'students.json'

        let provider
        if (type === 'JSON') provider = new JsonProvider(filePath)
        if (type === 'XML') provider = new XmlProvider(filePath)
        if (type === 'Binary') provider = new BinaryProvider(filePath)
        if (type === 'Custom') provider = new CustomProvider(filePath)

        if (!provider) {
            console.log('Provider is undefined')
            return
        }
        const context = new EntityContext(provider as any)
        const service = new StudentService(context)
        await service.init()

        while (true) {
            const { action } = await inquirer.prompt({
                type: 'list',
                name: 'action',
                message: 'Виберіть дію',
                choices: [
                    'Додати студента',
                    'Показати всіх студентів',
                    'Показати відмінниць (5 курс)',
                    'Зберегти у файл',
                    'Вийти'
                ]
            })

            if (action === 'Додати студента') {
                const s = await inquirer.prompt([
                    { name: 'id', message: 'ID студента:' },
                    { name: 'lastName', message: 'Прізвище:' },
                    { name: 'firstName', message: 'Ім’я:' },
                    { type: 'list', name: 'gender', message: 'Стать:', choices: ['M', 'F'] },
                    { name: 'course', message: 'Курс (1–5):', default: 5 },
                    { name: 'grade', message: 'Середній бал (1–5):', default: 4.5 }
                ])
                service.add({
                    id: s.id,
                    lastName: s.lastName,
                    firstName: s.firstName,
                    gender: s.gender,
                    course: Number(s.course),
                    grade: Number(s.grade)
                })
                console.log('Студента додано.')
            }

            if (action === 'Показати всіх студентів') {
                console.table(await service.getAll())
            }

            if (action === 'Показати відмінниць (5 курс)') {
                console.table(await service.getExcellentGirls())
            }

            if (action === 'Зберегти у файл') {
                await service.save()
                console.log(`Дані збережено у файл ${filePath}`)
            }

            if (action === 'Вийти') {
                console.log('Програму завершено.')
                break
            }
        }
    }
}

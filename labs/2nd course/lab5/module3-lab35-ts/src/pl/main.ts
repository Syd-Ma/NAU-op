import { JsonStudentRepository } from "../dal/JsonStudentRepository"
import { StudentService } from "../bll/StudentService"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const defaultJson = join(__dirname, "..", "dal", "students.sample.json")
const jsonPath = process.argv[2] ?? defaultJson

async function main() {
    const service = new StudentService(new JsonStudentRepository(jsonPath))
    const count = await service.countFemaleDistinctionsOn5(90)
    console.log(`Кількість студенток-відмінниць 5-го курсу (поріг 90): ${count}`)
    const diplomas = await service.graduateWithHonors(new Date().getFullYear(), "НАУ", 90)
    console.log("Дипломи з відзнакою:")
    for (const d of diplomas) {
        console.log(`- ${d.graduate.lastName} ${d.graduate.firstName} (${d.graduate.averageGrade}) — ${d.university} ${d.year}`)
    }
    const filtered = await service.filter(s => s.course === 5)
    console.log(`Відфільтровано студентів 5 курсу: ${filtered.length}`)
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})

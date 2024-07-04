import callSchema from './callsSchema'
import Pnf from '../../dataBase/schemas/Pnf'
import Subjects from '../../dataBase/schemas/subjects'
import DayOfWeek from '../../dataBase/schemas/dayOfWeek'
import HoursOfDay from '../../dataBase/schemas/hoursOfDay'
import Shift from '../../dataBase/schemas/shift'
import Classroom from '../../dataBase/schemas/classRoom'
import Teachers from '../../dataBase/schemas/teachers'
import Schedule from '../../dataBase/schemas/schedule'

export default function callDB(): void {
  const schemaList = [
    new Pnf(),
    new Subjects(),
    new DayOfWeek(),
    new HoursOfDay(),
    new Shift(),
    new Classroom(),
    new Teachers(),
    new Schedule()
  ]

  for (const schema of schemaList) {
    schema.buildTable()
  }

  for (const schema of schemaList) {
    callSchema(schema)
  }
}

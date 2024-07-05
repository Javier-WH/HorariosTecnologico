const crypto = require('crypto')
import DB from '../DB'
import DBinterface from '../interface/DBinterface'

export default class Schedule extends DB implements DBinterface {
  tableName = 'Schedule'

  getTableName(): string {
    return this.tableName
  }

  /*
    el aula no debe estar ocupada en el mismo horario
    el profesor no debe estar ocupado en el mismo horario

  */

  buildTable(): Promise<boolean> {
    const sql = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
            id TEXT PRIMARY KEY DEFAULT (RANDOM_UUID()),
            pnf_id TEXT NOT NULL,
            subject_id TEXT NOT NULL,
            teacher_id TEXT NOT NULL,
            classroom_id TEXT NOT NULL,
            shift_id TEXT NOT NULL,
            day_of_week_id TEXT NOT NULL,
            hour_of_day_id TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (pnf_id) REFERENCES pnfs(id),
            FOREIGN KEY (subject_id) REFERENCES subjects(id),
            FOREIGN KEY (teacher_id) REFERENCES teachers(id),
            FOREIGN KEY (classroom_id) REFERENCES classroom(id),
            FOREIGN KEY (shift_id) REFERENCES shift(id),
            FOREIGN KEY (day_of_week_id) REFERENCES day_week(id),
            FOREIGN KEY (hour_of_day_id) REFERENCES hours_day(id),
            UNIQUE (hour_of_day_id, day_of_week_id, classroom_id),
            UNIQUE (hour_of_day_id, day_of_week_id, teacher_id)
            )
          `
    return new Promise((resolve, reject) => {
      Schedule.connection === null
        ? reject("Connection doesn't exist")
        : Schedule.connection.run(sql, [], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  dropTable(): Promise<boolean> {
    const sql = `DROP TABLE IF EXISTS ${this.tableName}`

    return new Promise((resolve, reject) => {
      Schedule.connection === null
        ? reject("Connection doesn't exist")
        : Schedule.connection.run(sql, [], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  create(data): Promise<boolean> {
    const {
      pnf_id,
      subject_id,
      teacher_id,
      classroom_id,
      shift_id,
      day_of_week_id,
      hour_of_day_id
    } = data
    const uuid = crypto.randomUUID()
    const sql = `INSERT INTO ${this.tableName} (id, pnf_id,
      subject_id,
      teacher_id,
      classroom_id,
      shift_id,
      day_of_week_id,
      hour_of_day_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    return new Promise((resolve, reject) => {
      Schedule.connection === null
        ? reject("Connection doesn't exist")
        : Schedule.connection.run(
            sql,
            [
              uuid,
              pnf_id,
              subject_id,
              teacher_id,
              classroom_id,
              shift_id,
              day_of_week_id,
              hour_of_day_id
            ],
            (err) => {
              if (err) {
                reject(err)
              } else {
                resolve(true)
              }
            }
          )
    })
  }

  destroy(id): Promise<boolean> {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`

    return new Promise((resolve, reject) => {
      Schedule.connection === null
        ? reject("Connection doesn't exist")
        : Schedule.connection.run(sql, [id], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  update(data): Promise<boolean> {
    const {
      pnf_id,
      subject_id,
      teacher_id,
      classroom_id,
      shift_id,
      day_of_week_id,
      hour_of_day_id,
      id
    } = data
    const fields: string[] = []
    const values: string[] = []

    if (!id) {
      return Promise.reject('No id provided')
    }

    if (pnf_id) {
      fields.push('pnf_id = ?')
      values.push(pnf_id)
    }
    if (subject_id) {
      fields.push('subject_id = ?')
      values.push(subject_id)
    }
    if (teacher_id) {
      fields.push('teacher_id = ?')
      values.push(teacher_id)
    }
    if (classroom_id) {
      fields.push('classroom_id = ?')
      values.push(classroom_id)
    }
    if (shift_id) {
      fields.push('shift_id = ?')
      values.push(shift_id)
    }
    if (day_of_week_id) {
      fields.push('day_of_week_id = ?')
      values.push(day_of_week_id)
    }
    if (hour_of_day_id) {
      fields.push('hour_of_day_id = ?')
      values.push(hour_of_day_id)
    }

    if (fields.length === 0 || values.length === 0) {
      return Promise.reject('No data provided')
    }

    const sql = `UPDATE ${this.tableName} SET ${fields.join(', ')} WHERE id = ?`

    return new Promise((resolve, reject) => {
      Schedule.connection === null
        ? reject("Connection doesn't exist")
        : Schedule.connection.run(sql, values.concat([id]), (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  select(): Promise<object | null> {
    const sql = `SELECT * FROM ${this.tableName}`

    return new Promise((resolve, reject) => {
      Schedule.connection === null
        ? reject("Connection doesn't exist")
        : Schedule.connection.all(sql, [], (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
          })
    })
  }

  async where(id): Promise<object> {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`
    return new Promise((resolve, reject) => {
      Schedule.connection === null
        ? reject("Connection doesn't exist")
        : Schedule.connection.all(sql, [id], (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
          })
    })
  }
}

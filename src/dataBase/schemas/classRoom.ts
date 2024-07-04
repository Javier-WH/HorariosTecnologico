const crypto = require('crypto')
import DB from '../DB'
import DBinterface from '../interface/DBinterface'

export default class Classroom extends DB implements DBinterface {
  tableName = 'classrooms'

  getTableName(): string {
    return this.tableName
  }
  buildTable(): Promise<boolean> {
    const sql = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
            id TEXT PRIMARY KEY DEFAULT (RANDOM_UUID()),
            classrom_name TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP)
          `
    return new Promise((resolve, reject) => {
      Classroom.connection === null
        ? reject("Connection doesn't exist")
        : Classroom.connection.run(sql, [], (err) => {
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
      Classroom.connection === null
        ? reject("Connection doesn't exist")
        : Classroom.connection.run(sql, [], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  create(classroom): Promise<boolean> {
    const uuid = crypto.randomUUID()
    const sql = `INSERT INTO ${this.tableName} (id, classrom_name) VALUES (?, ?)`

    return new Promise((resolve, reject) => {
      Classroom.connection === null
        ? reject("Connection doesn't exist")
        : Classroom.connection.run(sql, [uuid, classroom], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  destroy(id): Promise<boolean> {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`

    return new Promise((resolve, reject) => {
      Classroom.connection === null
        ? reject("Connection doesn't exist")
        : Classroom.connection.run(sql, [id], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  update(data): Promise<boolean> {
    const { classroom, id } = data
    const sql = `UPDATE ${this.tableName} SET classrom_name = ? WHERE id = ?`

    return new Promise((resolve, reject) => {
      Classroom.connection === null
        ? reject("Connection doesn't exist")
        : Classroom.connection.run(sql, [classroom, id], (err) => {
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
      Classroom.connection === null
        ? reject("Connection doesn't exist")
        : Classroom.connection.all(sql, [], (err, rows) => {
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
      Classroom.connection === null
        ? reject("Connection doesn't exist")
        : Classroom.connection.all(sql, [id], (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
          })
    })
  }
}

const crypto = require('crypto')
import DB from '../DB'
import DBinterface from '../interface/DBinterface'

export default class HoursOfDay extends DB implements DBinterface {
  tableName = 'hours_day'

  getTableName(): string {
    return this.tableName
  }
  buildTable(): Promise<boolean> {
    const sql = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
            id TEXT PRIMARY KEY DEFAULT (RANDOM_UUID()),
            hours TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP)
          `
    return new Promise((resolve, reject) => {
      HoursOfDay.connection === null
        ? reject("Connection doesn't exist")
        : HoursOfDay.connection.run(sql, [], (err) => {
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
      HoursOfDay.connection === null
        ? reject("Connection doesn't exist")
        : HoursOfDay.connection.run(sql, [], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  create(hours): Promise<boolean> {
    const uuid = crypto.randomUUID()
    const sql = `INSERT INTO ${this.tableName} (id, hours) VALUES (?, ?)`

    return new Promise((resolve, reject) => {
      HoursOfDay.connection === null
        ? reject("Connection doesn't exist")
        : HoursOfDay.connection.run(sql, [uuid, hours], (err) => {
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
      HoursOfDay.connection === null
        ? reject("Connection doesn't exist")
        : HoursOfDay.connection.run(sql, [id], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  update(data): Promise<boolean> {
    const { hours, id } = data
    const sql = `UPDATE ${this.tableName} SET hours = ? WHERE id = ?`

    return new Promise((resolve, reject) => {
      HoursOfDay.connection === null
        ? reject("Connection doesn't exist")
        : HoursOfDay.connection.run(sql, [hours, id], (err) => {
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
      HoursOfDay.connection === null
        ? reject("Connection doesn't exist")
        : HoursOfDay.connection.all(sql, [], (err, rows) => {
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
      HoursOfDay.connection === null
        ? reject("Connection doesn't exist")
        : HoursOfDay.connection.all(sql, [id], (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
          })
    })
  }
}

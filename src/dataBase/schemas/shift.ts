const crypto = require('crypto')
import DB from '../DB'
import DBinterface from '../interface/DBinterface'

export default class Shift extends DB implements DBinterface {
  tableName = 'shift'

  getTableName(): string {
    return this.tableName
  }
  buildTable(): Promise<boolean> {
    const sql = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
            id TEXT PRIMARY KEY DEFAULT (RANDOM_UUID()),
            shift TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP)
          `
    return new Promise((resolve, reject) => {
      Shift.connection === null
        ? reject("Connection doesn't exist")
        : Shift.connection.run(sql, [], (err) => {
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
      Shift.connection === null
        ? reject("Connection doesn't exist")
        : Shift.connection.run(sql, [], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  create(shift): Promise<boolean> {
    const uuid = crypto.randomUUID()
    const sql = `INSERT INTO ${this.tableName} (id, shift) VALUES (?, ?)`

    return new Promise((resolve, reject) => {
      Shift.connection === null
        ? reject("Connection doesn't exist")
        : Shift.connection.run(sql, [uuid, shift], (err) => {
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
      Shift.connection === null
        ? reject("Connection doesn't exist")
        : Shift.connection.run(sql, [id], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  update(data): Promise<boolean> {
    const { shift, id } = data
    const sql = `UPDATE ${this.tableName} SET shift = ? WHERE id = ?`

    return new Promise((resolve, reject) => {
      Shift.connection === null
        ? reject("Connection doesn't exist")
        : Shift.connection.run(sql, [shift, id], (err) => {
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
      Shift.connection === null
        ? reject("Connection doesn't exist")
        : Shift.connection.all(sql, [], (err, rows) => {
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
      Shift.connection === null
        ? reject("Connection doesn't exist")
        : Shift.connection.all(sql, [id], (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
          })
    })
  }
}

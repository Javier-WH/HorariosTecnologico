const crypto = require('crypto')
import DB from '../DB'
import DBinterface from '../interface/DBinterface'

export default class Pnf extends DB implements DBinterface {
  tableName = 'pnfs'

  getTableName(): string {
    return this.tableName
  }

  buildTable(): Promise<boolean> {
    const sql = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
            id TEXT PRIMARY KEY DEFAULT (RANDOM_UUID()),
            pnf TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP)
          `
    return new Promise((resolve, reject) => {
      Pnf.connection === null
        ? reject("Connection doesn't exist")
        : Pnf.connection.run(sql, [], (err) => {
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
      Pnf.connection === null
        ? reject("Connection doesn't exist")
        : Pnf.connection.run(sql, [], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  create(data): Promise<boolean> {
    const { pnf, id } = data
    const uuid = id === undefined ? crypto.randomUUID() : id
    const sql = `INSERT INTO ${this.tableName} (id, pnf) VALUES (?, ?)`

    return new Promise((resolve, reject) => {
      Pnf.connection === null
        ? reject("Connection doesn't exist")
        : Pnf.connection.run(sql, [uuid, pnf], (err) => {
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
      Pnf.connection === null
        ? reject("Connection doesn't exist")
        : Pnf.connection.run(sql, [id], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  update(data): Promise<boolean> {
    const { pnf, id } = data
    const sql = `UPDATE ${this.tableName} SET pnf = ? WHERE id = ?`

    return new Promise((resolve, reject) => {
      Pnf.connection === null
        ? reject("Connection doesn't exist")
        : Pnf.connection.run(sql, [pnf, id], (err) => {
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
      Pnf.connection === null
        ? reject("Connection doesn't exist")
        : Pnf.connection.all(sql, [], (err, rows) => {
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
      Pnf.connection === null
        ? reject("Connection doesn't exist")
        : Pnf.connection.all(sql, [id], (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
          })
    })
  }
}

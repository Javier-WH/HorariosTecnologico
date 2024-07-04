const crypto = require('crypto')
import DB from '../DB'
import DBinterface from '../interface/DBinterface'

export default class Teachers extends DB implements DBinterface {
  tableName = 'teachers'

  getTableName(): string {
    return this.tableName
  }
  buildTable(): Promise<boolean> {
    const sql = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
            id TEXT PRIMARY KEY DEFAULT (RANDOM_UUID()),
            name TEXT NOT NULL UNIQUE,
            last_name TEXT NOT NULL UNIQUE,
            ci TEXT NOT NULL UNIQUE,
            status INTEGER NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP)
          `
    return new Promise((resolve, reject) => {
      Teachers.connection === null
        ? reject("Connection doesn't exist")
        : Teachers.connection.run(sql, [], (err) => {
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
      Teachers.connection === null
        ? reject("Connection doesn't exist")
        : Teachers.connection.run(sql, [], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  create(data): Promise<boolean> {
    const { name, last_name, ci, status } = data
    const uuid = crypto.randomUUID()
    const sql = `INSERT INTO ${this.tableName} (id, name, last_name, ci, status) VALUES (?, ?, ?, ?, ?)`

    return new Promise((resolve, reject) => {
      Teachers.connection === null
        ? reject("Connection doesn't exist")
        : Teachers.connection.run(sql, [uuid, name, last_name, ci, status], (err) => {
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
      Teachers.connection === null
        ? reject("Connection doesn't exist")
        : Teachers.connection.run(sql, [id], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  update(data): Promise<boolean> {
    const { name, last_name, ci, status, id } = data
    const fields: string[] = []
    const values: string[] = []

    if (!id) {
      return Promise.reject('No id provided')
    }

    if (name) {
      fields.push('name = ?')
      values.push(name)
    }
    if (last_name) {
      fields.push('last_name = ?')
      values.push(last_name)
    }
    if (ci) {
      fields.push('ci = ?')
      values.push(ci)
    }
    if (status) {
      fields.push('status = ?')
      values.push(status)
    }

    if (fields.length === 0 || values.length === 0) {
      return Promise.reject('No data provided')
    }

    const sql = `UPDATE ${this.tableName} SET ${fields.join(', ')} WHERE id = ?`

    return new Promise((resolve, reject) => {
      Teachers.connection === null
        ? reject("Connection doesn't exist")
        : Teachers.connection.run(sql, values.concat([id]), (err) => {
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
      Teachers.connection === null
        ? reject("Connection doesn't exist")
        : Teachers.connection.all(sql, [], (err, rows) => {
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
      Teachers.connection === null
        ? reject("Connection doesn't exist")
        : Teachers.connection.all(sql, [id], (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
          })
    })
  }
}

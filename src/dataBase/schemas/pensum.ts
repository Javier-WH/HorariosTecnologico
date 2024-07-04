const crypto = require('crypto')
import DB from '../DB'
import DBinterface from '../interface/DBinterface'

export default class Pensum extends DB implements DBinterface {
  tableName = 'Pensum'

  getTableName(): string {
    return this.tableName
  }
  buildTable(): Promise<boolean> {
    const sql = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
            id TEXT PRIMARY KEY DEFAULT (RANDOM_UUID()),
            subject_id TEXT NOT NULL,
            pnf_id TEXT NOT NULL,
            shift_id TEXT NOT NULL,
            hours INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP)
          `
    return new Promise((resolve, reject) => {
      Pensum.connection === null
        ? reject("Connection doesn't exist")
        : Pensum.connection.run(sql, [], (err) => {
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
      Pensum.connection === null
        ? reject("Connection doesn't exist")
        : Pensum.connection.run(sql, [], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  create(data): Promise<boolean> {
    const { subject_id, pnf_id, shift_id, hours } = data
    const uuid = crypto.randomUUID()
    const sql = `INSERT INTO ${this.tableName} (subject_id, pnf_id, shift_id, hours) VALUES (?, ?, ?, ?)`

    return new Promise((resolve, reject) => {
      Pensum.connection === null
        ? reject("Connection doesn't exist")
        : Pensum.connection.run(sql, [uuid, subject_id, pnf_id, shift_id, hours], (err) => {
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
      Pensum.connection === null
        ? reject("Connection doesn't exist")
        : Pensum.connection.run(sql, [id], (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
    })
  }

  update(data): Promise<boolean> {
    const { subject_id, pnf_id, shift_id, hours, id } = data
    const fields: string[] = []
    const values: string[] = []

    if (!id) {
      return Promise.reject('No id provided')
    }

    if (subject_id) {
      fields.push('subject_id = ?')
      values.push(subject_id)
    }
    if (pnf_id) {
      fields.push('pnf_id = ?')
      values.push(pnf_id)
    }
    if (shift_id) {
      fields.push('shift_id = ?')
      values.push(shift_id)
    }
    if (hours) {
      fields.push('hours = ?')
      values.push(hours)
    }

    if (fields.length === 0 || values.length === 0) {
      return Promise.reject('No data provided')
    }

    const sql = `UPDATE ${this.tableName} SET ${fields.join(', ')} WHERE id = ?`

    return new Promise((resolve, reject) => {
      Pensum.connection === null
        ? reject("Connection doesn't exist")
        : Pensum.connection.run(sql, values.concat([id]), (err) => {
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
      Pensum.connection === null
        ? reject("Connection doesn't exist")
        : Pensum.connection.all(sql, [], (err, rows) => {
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
      Pensum.connection === null
        ? reject("Connection doesn't exist")
        : Pensum.connection.all(sql, [id], (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
          })
    })
  }
}

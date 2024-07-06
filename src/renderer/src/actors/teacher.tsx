import ActorResponse from './actorResponse'
export default class Teacher {
  private name: string
  private lastName: string
  private cedula: string
  private status: boolean

  constructor(name: string, lastName: string, cedula: string, status: boolean) {
    this.name = name
    this.lastName = lastName
    this.cedula = cedula
    this.status = status
  }

  getName(): string {
    return this.name
  }

  getLastName(): string {
    return this.lastName
  }

  getCedula(): string {
    return this.cedula
  }

  getStatus(): boolean {
    return this.status
  }

  setName(name: string): void {
    this.name = name
  }

  setLastName(lastName: string): void {
    this.lastName = lastName
  }

  setCedula(cedula: string): void {
    this.cedula = cedula
  }

  setStatus(status: boolean): void {
    this.status = status
  }

  async save(): Promise<ActorResponse> {
    const data = {
      name: this.name,
      last_name: this.lastName,
      ci: this.cedula,
      status: this.status
    }

    try {
      await window.electron.ipcRenderer.invoke('teachers-create', data)
      return new ActorResponse(true, 'Se ha registrado el docente', null)
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('UNIQUE constraint failed: teachers.ci')) {
          return new ActorResponse(false, 'La cedula ya está registrada', null)
        } else {
          return new ActorResponse(false, err.message, null)
        }
      }
      return new ActorResponse(false, 'No se ha podido registrar el docente', null)
    }
  }
}

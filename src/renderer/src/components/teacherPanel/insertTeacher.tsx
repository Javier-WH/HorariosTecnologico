import { Radio, Button, Input, InputNumber, message, RadioChangeEvent } from 'antd'
import { IoPersonAddOutline } from 'react-icons/io5'
import { MdOutlineCleaningServices } from 'react-icons/md'
import { useState } from 'react'
import { GiTeacher } from 'react-icons/gi'
import Teacher from '@renderer/actors/teacher'

export default function InsertTeacher(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage()
  const [statusValue, setstatusValue] = useState('active')
  const [nameValue, setNameValue] = useState('')
  const [lastNameValue, setLastNameValue] = useState('')
  const [cedulaValue, setCedulaValue] = useState('')
  const [errorCedula, setErrorCedula] = useState<string | null>(null)
  const [errorName, setErrorName] = useState<string | null>(null)
  const [errorLastName, setErrorLastName] = useState<string | null>(null)

  const onChangeStatus = ({ target: { value } }: RadioChangeEvent): void => {
    setstatusValue(value)
  }
  const onChangeCedula = (e): void => {
    const value = e.target.value
    if (value === '') {
      setErrorCedula('Ingresa una cédula para el profesor')
    } else if (isNaN(value)) {
      setErrorCedula('La cédula solo acepta valores numéricos')
    } else {
      setErrorCedula(null)
    }
    setCedulaValue(value)
  }
  const onChangeName = (e): void => {
    const value = e.target.value
    if (value === '') {
      setErrorName('Ingresa un nombre para el profesor')
    } else if (value.length > 60) {
      setErrorName('El nombre no puede ser mayor a 60 caracteres')
    } else {
      setErrorName(null)
    }
    setNameValue(value)
  }

  const onChangeLastName = (e): void => {
    const value = e.target.value
    if (value === '') {
      setErrorLastName('Ingresa un apellido para el profesor')
    } else if (value.length > 60) {
      setErrorLastName('El apellido no puede ser mayor a 60 caracteres')
    } else {
      setErrorLastName(null)
    }
    setLastNameValue(value)
  }

  const handleClean = (): void => {
    setNameValue('')
    setLastNameValue('')
    setCedulaValue('')
    setstatusValue('active')
    setErrorCedula(null)
    setErrorName(null)
    setErrorLastName(null)
  }

  const handleInsert = (): void => {
    const saveTeacher = async (): Promise<void> => {
      const teacher = new Teacher(nameValue, lastNameValue, cedulaValue, statusValue)
      const response = await teacher.save()
      if (response.status) {
        messageApi.open({
          type: 'success',
          content: 'Se ha guardado el profesor',
          duration: 3
        })
        handleClean()
      } else {
        console.log(response.message)
      }
    }
    saveTeacher()
  }

  const allowInsert = (): boolean => {
    if (
      nameValue === '' ||
      lastNameValue === '' ||
      cedulaValue === '' ||
      errorCedula ||
      errorName ||
      errorLastName
    ) {
      return false
    }
    return true
  }
  return (
    <>
      {contextHolder}
      <div className="outletContainer">
        <h1 className="outlet-title">
          <GiTeacher /> &nbsp; Agregar Profesor
        </h1>
        <div className="input-container">
          <label htmlFor="name" className={errorName ? 'error-label' : ''}>
            Nombre
          </label>
          <Input
            placeholder="Ingresa un nombre para el profesor"
            value={nameValue}
            onChange={onChangeName}
            status={errorName ? 'error' : ''}
          />
          {errorName && <div className="error-message">{errorName}</div>}
        </div>
        <div className="input-container">
          <label htmlFor="name" className={errorLastName ? 'error-label' : ''}>
            Apellido
          </label>
          <Input
            placeholder="Ingresa un apellido para el profesor"
            value={lastNameValue}
            onChange={onChangeLastName}
            status={errorLastName ? 'error' : ''}
          />
          {errorLastName && <div className="error-message">{errorLastName}</div>}
        </div>
        <div className="input-container">
          <label htmlFor="name" className={errorCedula ? 'error-label' : ''}>
            Cédula
          </label>
          <InputNumber
            placeholder="Ingresa una cédula para el profesor"
            status={errorCedula ? 'error' : ''}
            style={{ width: '100%' }}
            onKeyUp={onChangeCedula}
            value={cedulaValue}
          />
          {errorCedula && <div className="error-message">{errorCedula}</div>}
        </div>
        <div className="input-container">
          <label htmlFor="name">Estatus</label>
          <Radio.Group
            options={[
              { label: 'Activo', value: 'active' },
              { label: 'Inactivo', value: 'inactive' }
            ]}
            onChange={onChangeStatus}
            value={statusValue}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
        <div className="button-container">
          <Button
            type="primary"
            icon={<IoPersonAddOutline />}
            disabled={!allowInsert()}
            onClick={handleInsert}
          >
            Agregar
          </Button>
          <Button type="dashed" icon={<MdOutlineCleaningServices />} onClick={handleClean}>
            Limpiar
          </Button>
        </div>
      </div>
    </>
  )
}

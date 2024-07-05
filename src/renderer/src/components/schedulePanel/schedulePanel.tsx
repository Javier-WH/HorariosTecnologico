import Schedule from '../schedule/schedule'
import { Select, Button } from 'antd'

export default function SchedulePanel(): JSX.Element {
  const options = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true }
  ]

  const handleChange = (value: string): void => {
    console.log(`selected ${value}`)
  }

  return (
    <div>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
        options={options}
      />
      <Button type="primary">Generar</Button>
      <Schedule />
    </div>
  )
}

import SchedulePanel from '../schedulePanel/schedulePanel'
import InsertTeacher from '../teacherPanel/insertTeacher'

export const activeTab = {
  NewSchedule: 'newSchedule',
  ShowSchedule: 'showSchedule',
  NewTeachers: 'newTeachers',
  ShowTeachers: 'showTeachers',
  NewPensum: 'newPensum',
  ShowPensum: 'showPensum',
  NewPNF: 'newPNF',
  ShowPNF: 'showPNF',
  NewMaterias: 'newMaterias',
  ShowMaterias: 'showMaterias',
  Sync: 'sync',
  Config: 'config',
  Help: 'help'
}

export function getTab(tab): JSX.Element {
  switch (tab) {
    case activeTab.NewSchedule:
      return <SchedulePanel />
    case activeTab.ShowSchedule:
      return <h1>Horarios</h1>
    case activeTab.NewTeachers:
      return <InsertTeacher />
    case activeTab.ShowTeachers:
      return <h1>Show Teachers</h1>
    case activeTab.NewPensum:
      return <h1>Pensum</h1>
    case activeTab.ShowPensum:
      return <h1>Show Pensum</h1>
    case activeTab.NewPNF:
      return <h1>PNF</h1>
    case activeTab.ShowPNF:
      return <h1>Show PNF</h1>
    case activeTab.NewMaterias:
      return <h1>Materias</h1>
    case activeTab.ShowMaterias:
      return <h1>Show Materias</h1>
    case activeTab.Sync:
      return <h1>Sync</h1>
    case activeTab.Config:
      return <h1>Config</h1>
    case activeTab.Help:
      return <h1>Help</h1>
    default:
      return <h1> Not found </h1>
  }
}

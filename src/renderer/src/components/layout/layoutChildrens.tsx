import SchedulePanel from '../schedulePanel/schedulePanel'

export const activeTab = {
  Schedule: 'schedule',
  Teachers: 'teachers',
  Pensum: 'pensum'
}

export function getTab(tab): JSX.Element {
  switch (tab) {
    case activeTab.Schedule:
      return <SchedulePanel />
    case activeTab.Teachers:
      return <h1>Teachers</h1>
    case activeTab.Pensum:
      return <h1>Pensum</h1>
    default:
      return <h1> Not found </h1>
  }
}

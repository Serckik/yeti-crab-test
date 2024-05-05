import { ChangeEvent, useEffect, useState } from 'react';
import { Button, TextInput } from '@gravity-ui/uikit';
import { useAppDispatch, useAppSelector } from './components/hooks';
import { initialTask } from './components/store/reducer';
import { TableData } from './types';
import { TaskStatus } from './enums';
import TaskInfo from './components/task-info';
import { addTask, deleteTask } from './components/store/action';
import TableComponent from './components/table';

function App() {
  const dispatch = useAppDispatch()

  const storeTableData = useAppSelector(store => store.tableData)
  const [tableData, setTableData] = useState(storeTableData)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<TableData>(initialTask);
  const [searchData, setSearchData] = useState('')
  const [open, setOpen] = useState(false);
  const [isShowCompleted, setShowCompleted] = useState(true)
  const [isEditor, setIsEditor] = useState(false)

  useEffect(() => {
    let filteredTableData = storeTableData
    if (!isShowCompleted) {
      filteredTableData = filteredTableData.filter(item => item.status !== TaskStatus.done)
    }
    const filteredData = filteredTableData.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchData.toLowerCase())
      )
    );
    setTableData(filteredData)
  }, [storeTableData, isShowCompleted, searchData])

  function handleAddTask() {
    dispatch(addTask())
  }

  function changeTask(item: TableData) {
    setOpen(true)
    setSelectedTask(item)
  }

  function handleDeleteTask() {
    const deletedTasks = tableData.filter((__item, index) => selectedIds.includes(String(index)))
    dispatch(deleteTask(deletedTasks.map(item => item.id)))
    setSelectedIds([])
  }

  function handleSelect(ids: string[]) {
    setSelectedIds(ids)
  }

  function handleSearch(evt: ChangeEvent<HTMLInputElement>) {
    setSearchData(evt.target.value)
  }

  function handleModal(isOpen: boolean) {
    setOpen(isOpen)
    setSelectedTask(initialTask)
  }

  return (
    <section id='table'>
      <h1>Количество заявок: {storeTableData.length}</h1>
      <h1>Количество заявок после фильтрации: {tableData.length}</h1>
      <Button onClick={() => { setIsEditor(!isEditor) }} view='action'>{'Перейти в режим '}{isEditor ? 'просмотра' : 'редактирования'}</Button>
      <Button onClick={() => { setShowCompleted(!isShowCompleted) }} view='action'>{isShowCompleted ? 'Скрыть ' : 'Показать '}{'выполненные'}</Button>
      {isEditor &&
        <>
          <Button onClick={handleAddTask} view='action'>Добавить заявку</Button>
          {selectedIds.length > 0 && <Button onClick={handleDeleteTask} view='action'>Удалить выбранные</Button>}
        </>
      }
      <TextInput label="Поиск: " value={searchData} onChange={handleSearch} />
      <TableComponent isEditor={isEditor} tableData={tableData} selectedIds={selectedIds} handleSelect={handleSelect} changeTask={changeTask} />
      <TaskInfo open={open} selectedTask={selectedTask} setOpen={handleModal} />
    </section>
  )
}

export default App

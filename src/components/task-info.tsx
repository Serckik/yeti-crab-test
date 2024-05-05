import { Button, Modal, RadioButton, RadioButtonOption, TextArea, TextInput } from "@gravity-ui/uikit"
import { TaskStatus } from "../enums";
import { TableData } from "../types";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch } from "./hooks";
import { changeTask } from "./store/action";

const options: RadioButtonOption[] = [
    { value: 'new', content: TaskStatus.new, disabled: true },
    { value: 'inProgress', content: TaskStatus.inProgress },
    { value: 'done', content: TaskStatus.done },
];

type TaskInfoProps = {
    open: boolean;
    selectedTask: TableData;
    setOpen: (value: boolean) => void;
}

function TaskInfo({ open, selectedTask, setOpen }: TaskInfoProps) {
    const dispatch = useAppDispatch()

    const [firm, setFirm] = useState(selectedTask.firmName)
    const [carrier, setCarrier] = useState(selectedTask.carrierName)
    const [numberCarrier, setNumberCarrier] = useState(selectedTask.carrierNumber)
    const [comment, setComment] = useState(selectedTask.comments)
    const [status, setStatus] = useState(selectedTask.status)
    const [atiCode, setAtiCode] = useState(selectedTask.atiCode)
    const [isNumberValid, setIsNumberValid] = useState(true)
    const [isFirmValid, setIsFirmValid] = useState(true)
    const [isCarrierValid, setIsCarrierValid] = useState(true)

    useEffect(() => {
        setFirm(selectedTask.firmName)
        setCarrier(selectedTask.carrierName)
        setNumberCarrier(selectedTask.carrierNumber)
        setComment(selectedTask.comments)
        setStatus(selectedTask.status)
        setAtiCode(selectedTask.atiCode)
    }, [selectedTask])

    function getKeyByValue(value: string): keyof typeof TaskStatus | undefined {
        return Object.keys(TaskStatus)
            .find(key => TaskStatus[key as keyof typeof TaskStatus] === value) as keyof typeof TaskStatus | undefined;
    }

    function handleFirm(evt: ChangeEvent<HTMLInputElement>): void {
        setFirm(evt.target.value)
    }

    function handleCarrier(evt: ChangeEvent<HTMLInputElement>): void {
        setCarrier(evt.target.value)
    }

    function handleNumberCarrier(evt: ChangeEvent<HTMLInputElement>): void {
        setNumberCarrier(evt.target.value)
    }

    function handleComment(evt: ChangeEvent<HTMLTextAreaElement>): void {
        setComment(evt.target.value)
    }

    function handleAtiCode(evt: ChangeEvent<HTMLInputElement>): void {
        setAtiCode(Number(evt.target.value))
    }

    function handleStatus(evt: ChangeEvent<HTMLInputElement>) {
        setStatus(TaskStatus[evt.target.value as unknown as keyof typeof TaskStatus])
    }

    function handleSubmit(evt: SyntheticEvent): void {
        evt.preventDefault()
        const changedTask: TableData = {
            id: selectedTask.id,
            date: selectedTask.date,
            firmName: firm,
            carrierName: carrier,
            carrierNumber: numberCarrier,
            comments: comment,
            status: status,
            atiCode: atiCode,
        }
        const phoneRegex = /^\+7\d{10}$/;
        const isValidPhone = phoneRegex.test(numberCarrier);
        const isValidFirm = firm.trim() !== ''
        const isValidCarrier = carrier.trim() !== ''
        setIsFirmValid(isValidFirm)
        setIsCarrierValid(isValidCarrier)
        setIsNumberValid(isValidPhone)
        if (isValidPhone && isValidFirm && isValidCarrier) {
            dispatch(changeTask(changedTask))
            setOpen(false)
        }
    }

    function handleCloseModal() {
        setOpen(false);
        setIsFirmValid(true)
        setIsCarrierValid(true)
        setIsNumberValid(true)
    }

    return (
        <Modal open={open} onClose={handleCloseModal}>
            <h2>Редактирование заказа</h2>
            <form onSubmit={handleSubmit}>
                <TextInput label="Фирма: " value={firm} onChange={handleFirm} errorMessage="Поле не должно быть пустым" validationState={isFirmValid ? undefined : 'invalid'} />
                <TextInput label="Перевозчик: " value={carrier} onChange={handleCarrier} errorMessage="Поле не должно быть пустым" validationState={isCarrierValid ? undefined : 'invalid'} />
                <TextInput label="Номер перевозчика: " value={numberCarrier} onChange={handleNumberCarrier} errorMessage="Введите верный формат номера" validationState={isNumberValid ? undefined : 'invalid'} />
                <p>Комментарии</p>
                <TextArea placeholder="Введите комментарий к заказу" size="xl" value={comment} onChange={handleComment} />
                <TextInput label="ATI код: " type="number" value={String(atiCode)} onChange={handleAtiCode} />
                <RadioButton name="group1" options={options} value={getKeyByValue(status)} onChange={handleStatus} />
                <Button type="submit" view='action'>Сохранить</Button>
            </form>
        </Modal>
    )
}

export default TaskInfo
import { createReducer } from '@reduxjs/toolkit';
import { TableData } from '../../types';
import { addTask, changeTask, deleteTask } from './action';
import { TaskStatus } from '../../enums';

type InitialState = {
    tableData: TableData[]
}

const initialState: InitialState = {
    tableData: [{
        id: '1',
        date: '05-05-2024 22:21:15',
        firmName: 'Управление Автомобильных Перевозок Европа+Азия, ООО',
        carrierName: 'Иванов Иван Иванович',
        carrierNumber: '+79023456784',
        comments: 'Срочный заказ',
        status: TaskStatus.new,
        atiCode: 12345,
    },
    ]
};

export const initialTask: TableData = {
    id: '',
    date: '',
    firmName: '',
    carrierName: '',
    carrierNumber: '',
    comments: '',
    status: TaskStatus.new,
    atiCode: 0,
}

export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeTask, (state, action) => {
            const index = state.tableData.findIndex(item => item.id === action.payload.id);
            state.tableData[index] = action.payload
        })
        .addCase(addTask, (state) => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');

            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');
            const newId = state.tableData.length > 0 ? Math.max(...state.tableData.map(item => Number(item.id))) + 1 : 1;
            const newItem: TableData = {
                id: String(newId),
                date: `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`,
                firmName: 'Название фирмы',
                carrierName: 'ФИО',
                carrierNumber: '+7',
                comments: '',
                status: TaskStatus.new,
                atiCode: 0,
            }
            state.tableData = [...state.tableData, newItem]
        })
        .addCase(deleteTask, (state, action) => {
            const oldData = state.tableData
            const newData = oldData.filter((item) => !action.payload.includes(item.id));
            state.tableData = [...newData]
        })
});
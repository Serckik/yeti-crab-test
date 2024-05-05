import { createAction } from "@reduxjs/toolkit";
import { TableData } from "../../types";

export const changeTask = createAction<TableData>('data/changeData');

export const addTask = createAction('data/addTask');

export const deleteTask = createAction<string[]>('data/deleteTask');
import { TaskStatus } from "./enums";

export type TableData = {
    id: string;
    date: string;
    firmName: string;
    carrierName: string;
    carrierNumber: string;
    comments: string;
    status: TaskStatus;
    atiCode: number;
}

export type TableColumn = {
    id: string;
    meta: {
        sort?: boolean;
        defaultSortOrder?: 'asc' | 'desc';
        sortFunction?: (a: any, b: any) => number;
    };
};

export type TableRowSettings = {
    isSelected: boolean;
    id: string;
}
import { Table, withTableSelection, withTableSettings, withTableSorting, withTableActions, Link } from '@gravity-ui/uikit';
import { TableColumn, TableData, TableRowSettings } from '../types';
import { initialTask } from './store/reducer';
import { useState } from 'react';

type TableComponentProps = {
    tableData: TableData[];
    selectedIds: string[];
    handleSelect: (ids: string[]) => void;
    changeTask: (item: TableData) => void;
    isEditor: boolean;
}

function TableComponent({ tableData, selectedIds, handleSelect, changeTask, isEditor }: TableComponentProps) {
    const [settings, setSettings] = useState<TableRowSettings[]>([]);

    const EditorTable = withTableActions(withTableSorting(withTableSelection(withTableSettings({ sortable: true })(Table))))
    const DefaultTable = withTableSorting(withTableSettings({ sortable: true })(Table))

    const columns = generateColumns(initialTask);

    const getRowActions = () => {
        return [
            {
                text: 'Редактировать',
                handler: (item: any) => { changeTask(item as TableData) },
            }
        ];
    };


    function generateColumns(type: TableData): TableColumn[] {
        return (Object.keys(type) as Array<keyof TableData>).map(key => ({
            id: key,
            meta: { sort: true },
            template: ((item: TableData): React.ReactNode => {
                const value = item[key];
                if (key === 'atiCode') {
                    return <Link view='normal' href={`https://ati.su/firms/${value}/info`} target='_blank'>{`ati.su/firms/${value}/info`}</Link>
                }
                return <p>{value}</p>
            })
        }));
    }

    return (
        <>
            {isEditor ? <EditorTable
                data={tableData}
                columns={columns}
                selectedIds={selectedIds}
                onSelectionChange={(ids: string[]) => { handleSelect(ids) }}
                settings={settings}
                updateSettings={(settings) => {
                    const updatedSettings = settings.map(setting => ({
                        ...setting,
                        isSelected: setting.isSelected || false
                    }));
                    setSettings(updatedSettings);;
                    return Promise.resolve();
                }}
                getRowActions={getRowActions}
                emptyMessage={'Заказ не найден'}
            /> :
                <DefaultTable
                    data={tableData}
                    columns={columns}
                    settings={settings}
                    updateSettings={(settings) => {
                        const updatedSettings = settings.map(setting => ({
                            ...setting,
                            isSelected: setting.isSelected || false
                        }));
                        setSettings(updatedSettings);;
                        return Promise.resolve();
                    }}
                    emptyMessage={'Заказ не найден'}
                />
            }
        </>
    )
}

export default TableComponent
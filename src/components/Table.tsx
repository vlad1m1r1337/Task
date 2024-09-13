import '../css/Table.css'
import React, {useEffect} from "react";
import {useAppDispatch} from "../hooks";
import {fetchTable} from "../store/tableSlice";
import {useAppSelector} from "../hooks";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../css/Table.css";
import { Message } from 'primereact/message';

export const Table : React.FC = () => {
    const dispatch = useAppDispatch();
    const Data = useAppSelector(state => state.table.table);
    const loading = useAppSelector(state => state.table.request_status.loading);
    const error = useAppSelector(state => state.table.request_status.error);
    useEffect(() => {
        dispatch(fetchTable());
    }, [dispatch]);

    const columns = [
        {field: 'name', header: 'Name'},
        {field: 'surname', header: 'Surname'},
        {field: 'email', header: 'Email'},
        {field: 'age', header: 'Age'},

    ];
    console.log('Data', Data);
    return (
        <main className="main">
                {error && <Message severity="error" text={error} className="error_message"/>}
                {loading ? <i className="pi pi-spin pi-spinner loader" style={{fontSize: '50px'}}></i> :
                    <DataTable value={Data} tableStyle={{minWidth: '50rem'}}>
                        <Column
                            field="file"
                            header="Photo"
                            body={(rowData: any) => rowData.file?.objectURL ? (
                                <img src={rowData.file.objectURL} alt="User Photo" style={{ width: '60px', height: '60px' }} />
                            ) : null}
                        />
                        {columns.map((col, i) => (
                            <Column sortable key={col.field} field={col.field} header={col.header}/>
                        ))}
                    </DataTable>
                }
        </main>
    )
}

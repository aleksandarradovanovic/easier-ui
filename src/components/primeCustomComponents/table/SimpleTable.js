import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import PropTypes from 'prop-types'

export const SimpleTable = (props) => {
    const { tableData, tableProps, columns, onEdit, onDelete, onView, actionTitle, count, paginationFunc, paginator, customActionTemplate } = { tableData: [], tableProps: {}, actionTitle: "", count: 0, ...props }
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(paginator ? 10 : count);
    const [loading, setLoading] = useState(false);
    const onViewAction = (row) => {
      if (onView) {
        onView(row)
      }
    }
    const onEditAction = (row) => {
      if (onEdit) {
        onEdit(row)
      }
    }
    const onDeleteAction = (row) => {
      if (onDelete) {
        onDelete(row)
      }
    }
    let columnsArray = []
    if (columns) {
      columnsArray = columns
    }
    if (onEdit || onView || onDelete || customActionTemplate) {
      if (columnsArray.length > 0 && columnsArray.findIndex(x => x.field === "actions") == -1) {
        columnsArray.push({
          field: 'actions'
        })
  
      }
    }
    const actionBodyTemplate = (rowData) => {
      if(customActionTemplate){
        return customActionTemplate(rowData)
      } else {
        return (
          <div className = "actionColumn" style={{display: "flex"}}>
            {onView && <Button icon="pi pi-eye" className="p-button-rounded p-button-info" onClick={() => onViewAction(rowData)} />}
            {onEdit && <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => onEditAction(rowData)} />}
            {onDelete && <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => onDeleteAction(rowData)} />}
          </div>
        );
      }
    }
    let dynamicColumns = []
    if (columnsArray.length > 0) {
      dynamicColumns = columnsArray.map((col) => {
        if (col.field == "actions") {
          return <Column key={col.field} field={col.field} header={actionTitle} body={actionBodyTemplate} style={{ width: '10%' }} />
        }
        else {
          return <Column key={col.field} field={col.field} header={col.header} body = {col.body} style={{ width: col.width ? col.width : "auto" }} />;
  
        }
      });
    }
  
    const onCustomPage = (event) => {
      setFirst(event.first);
      setRows(event.rows);
      setLoading(true)
      if(paginationFunc){
        paginationFunc(event.page, event.rows)

      }
      setLoading(false)
    }
    return (
      <div>
        <DataTable value={tableData} loading={loading} paginator = {paginator} rows={rows} first={first} lazy={paginationFunc ? true : false} rowsPerPageOptions={[5, 10, 20]} totalRecords={count} onPage={onCustomPage} paginatorClassName="justify-content-end" responsiveLayout="scroll" {...tableProps} >
          {dynamicColumns}
        </DataTable>
      </div>
    )
  }
export default SimpleTable
SimpleTable.propTypes = {
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onView: PropTypes.func,
    columns: PropTypes.array.isRequired,
    tableData: PropTypes.array.isRequired
  }
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import PropTypes from 'prop-types'
import NodeService from '../service/NodeService';
export const TestSimpleTable = (props) => {
  const { tableData, tableProps, columns, onEdit, onDelete, onView, actionTitle, count, paginationFunc, paginator } = { tableData: [], tableProps: {}, actionTitle: "", count: 0, ...props }
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
  if (onEdit || onView || onDelete) {
    if (columnsArray.length > 0 && columnsArray.findIndex(x => x.field === "actions") == -1) {
      columnsArray.push({
        field: 'actions'
      })

    }
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {onView && <Button icon="pi pi-eye" className="p-button-rounded p-button-info" onClick={() => onViewAction(rowData)} />}
        {onEdit && <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => onEditAction(rowData)} />}
        {onDelete && <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => onDeleteAction(rowData)} />}
      </React.Fragment>
    );
  }
  let dynamicColumns = []
  if (columnsArray.length > 0) {
    dynamicColumns = columnsArray.map((col) => {
      if (col.field == "actions") {
        return <Column key={col.field} field={col.field} header={actionTitle} body={actionBodyTemplate} style={{ width: '10%' }} />
      }
      else {
        return <Column key={col.field} field={col.field} header={col.header} style={{ width: col.width ? col.width : "auto" }} />;

      }
    });
  }

  const onCustomPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setLoading(true)
    paginationFunc(event.page, event.rows)
    setLoading(false)
  }
  return (
    <div>
      <DataTable value={tableData} loading={loading} paginator= {paginator} rows={rows} first={first} lazy={paginator} rowsPerPageOptions={[5, 10, 20]} totalRecords={count} onPage={onCustomPage} paginatorClassName="justify-content-end" responsiveLayout="scroll" {...tableProps} >
        {dynamicColumns}
      </DataTable>
    </div>
  )
}
TestSimpleTable.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
  columns: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
}
TestSimpleTable.displayName = "TestSimpleTable"

// export default TestSimpleTable

const TestTable = () => {
  const [tableData, setTableData] = useState([]);
  const [tableCount, setTableCount] = useState(0);
  const columns = [
    {
      field: 'id',
      header: "ID"
    },
    {
      field: 'name',
      header: "Passenger Name"
    }
  ];
  let nodeservice = new NodeService();
  const paginationFunc = (pageNumber, pageSize) => {
    nodeservice
      .getTableData(pageNumber, pageSize)
      .then((data) => {
        if (data.data) {
          let newArray = data.data.map(function (x) {
            return {
              id: x._id,
              name: x.name
            }
          })
          setTableCount(data.totalPassengers)
          setTableData(newArray)
        }

      });
  }
  useEffect(() => {
    paginationFunc(0, 50)
  }, [])
  return (
    <div>
      <TestSimpleTable tableData={tableData}
        actionTitle="Action title"
        columns={columns}
        count={tableCount}
        paginator={true}
        onEdit={(data) => console.log(data, 'edit data')}
        onView={(data) => console.log(data, 'view data')}
        onDelete={(data) => console.log(data, 'delete data')}
        paginationFunc={paginationFunc}
      />
    </div>
  )
}
export default TestTable



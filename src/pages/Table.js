import React from "react";
import { useEffect, useState, useRef } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";

const Table = (props) => {
  console.log(props, "props from table");
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json").then(
      (resp) => resp.json()
    );
  };

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json").then(
      (result) => result.json()
    );
  }, []);

  const onBtnExport = () => {
    gridApi.exportDataAsCsv();
  };

  return (
    <div style={{ width: "100%", height: 700 }}>
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "100%" }}
      >
        {" "}
        <button onClick={() => onBtnExport()}>Download CSV export file</button>
        <AgGridReact
          rowData={props.referrals}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
          }}
          enableRangeSelection={true}
          rowSelection={"multiple"}
          statusBar={{
            statusPanels: [
              {
                statusPanel: "agTotalAndFilteredRowCountComponent",
                align: "left",
              },
              {
                statusPanel: "agTotalRowCountComponent",
                align: "center",
              },
              { statusPanel: "agFilteredRowCountComponent" },
              { statusPanel: "agSelectedRowCountComponent" },
              { statusPanel: "agAggregationComponent" },
            ],
          }}
          sideBar={{
            toolPanels: [
              {
                id: "columns",
                labelDefault: "Columns",
                labelKey: "columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel",
              },
              {
                id: "filters",
                labelDefault: "Filters",
                labelKey: "filters",
                iconKey: "filter",
                toolPanel: "agFiltersToolPanel",
              },
            ],
          }}
          columnHoverHighlight={true}
          onGridReady={onGridReady}
        >
          <AgGridColumn
            field="ID"
            sortable={true}
            filter={true}
            checkboxSelection={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Diagnosis"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Status"
            filter="agDateColumnFilter"
          ></AgGridColumn>
          <AgGridColumn
            field="Order_type"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Patient_ID"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Created_At"
            filter="agDateColumnFilter"
            sortable={true}
            // filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Updated_at"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Patient_Name"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          {/* <AgGridColumn
          field="Patient_Gender"
          sortable={true}
          filter={true}
          checkboxSelection={true}
        ></AgGridColumn> */}
          {/* <AgGridColumn
          field="model"
          sortable={true}
          filter={true}
        ></AgGridColumn> */}
          {/* <AgGridColumn
          field="price"
          sortable={true}
          filter={true}
        ></AgGridColumn> */}
        </AgGridReact>
      </div>
    </div>
  );
};
export default Table;

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const MassTextSummary = ({ summary }) => {
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);

  const gridRef = useRef();

  useEffect(() => {
    setColumnDefs([
      {
        field: "id",
        filter: "agSetColumnFilter",
        sortable: true,
        minWidth: 70,
      },
      { field: "first", filter: "agSetColumnFilter", minWidth: 100 },
      { field: "last", filter: "agSetColumnFilter", minWidth: 100 },
      { field: "phone", filter: "agSetColumnFilter", minWidth: 150 },
      { field: "sent", filter: "agSetColumnFilter", minWidth: 100 },
      {
        field: "notes",
        filter: "agSetColumnFilter",
        minWidth: 400,
      },
    ]);
  }, []);

  useEffect(() => {
    setRowData(summary.map((el) => ({ ...el, sent: el.sent ? "Yes" : "No" })));
  }, [summary]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
    resizable: true,
  }));

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  return (
    <div className="container-fluid" style={{ minHeight: "60vh" }}>
      <div
        className="ag-theme-alpine mt-2"
        style={{ height: 420, width: "auto" }}>
        <button onClick={() => onBtExport()}>Download as Excel File</button>
        <button onClick={() => onBtnExport()}>Download as CSV File</button>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          ref={gridRef}
        />
      </div>
    </div>
  );
};

export default MassTextSummary;

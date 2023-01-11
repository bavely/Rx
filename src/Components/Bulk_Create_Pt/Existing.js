import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
  } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";

function Existing(props) {
    const headers = {
        note:"",
        first: "",
        last: "",
        email: "",
        phone: "",
        DOB: "",
        gender: "",
        race: "",
        height: "",
        weight: "",
        SSN: "",
        name: "",
        relation: "",
        street: "",
        city: "",
        zip: "",
        state: "",
        emName: "",
        emRelation: "",
        altPhone: ""
        
      };

      const [columnDefs, setColumnDefs] = useState([]);
      const [search, setSearch] = useState("");
      const [aggridapi, setGridApi ] = useState(null)
      const [exdata, setExData] = useState([])
      const gridRef = useRef();

      useEffect(() => {
        setColumnDefs(
          Object.keys(headers).map((key) => {
            if (["email", "note"].includes(key)) {
              return {
                field: `${key}`,
                filter: "agSetColumnFilter",
                minWidth: 200,
                resizable: true,
                editable: true
              };
            } else {
              return {
                field: `${key}`,
                filter: "agSetColumnFilter",
                minWidth: 150,
                resizable: true,
                editable: true
              };
            }
          })
    
        );
    
        
      }, []);

      useEffect(() => {
        // console.log(props.data)
        
        setExData(props.data)
      }, [props.data]);

      const defaultColDef = useMemo(() => ({
        sortable: true,
        flex: 1,
        resizable: true,
      }));
      const handleSearch = (e) => {
        setSearch(e.target.value);
        gridRef.current.api.setQuickFilter(e.target.value);
      };
    
      const handleExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
      }, []);
    
      const onGridReady = (params) => {
        setGridApi(params.api);
      }
    
      const getRowStyle = (params) => {
        // console.log(params);
        if (params.data.note === "") {
            return { background: "#ABEBC6" };
        } else {
          

          return { background: "#e35d5d" };
        }
      };
  return (
    <><hr/><h4 style={{marginTop:"30px", padding:"10px", textAlign:"center", border:"1px solid black"}}>Existing Patients</h4> {exdata.length > 0 &&  (
        <>
 
          <div className="col-12 col-md-6 col-lg-4 mt-5 mb-1">
            <div className="input-group flex-nowrap  ">
              <input
                type="text"
                className="form-control "
                placeholder="Search"
                aria-label="Search"
                aria-describedby="addon-wrapping"
                onChange={handleSearch}
                value={search}
              />
              <span
                className="input-group-text"
                id="addon-wrapping"
              >
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>

          <AgGridReact
          getRowStyle = {getRowStyle}
          onGridReady={onGridReady}
            suppressExcelExport={true}
            rowData={exdata}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            ref={gridRef}
          ></AgGridReact>
          <button
            className=" border-0 btn btn-outline-primary m-3"
            onClick={handleExport}
          >
            Export to a PDF
          </button>

        </>
      )}</>
  )
}

export default Existing
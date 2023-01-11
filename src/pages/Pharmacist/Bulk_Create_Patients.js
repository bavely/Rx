import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Importer, ImporterField } from "react-csv-importer";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import TableViewer from "react-js-table-with-csv-dl";
import "react-csv-importer/dist/index.css";
import pharmacistHelper from "../../utils/Pharmacist_Helper";


function BulkCreatePatients() {
  const headers = {
    note: "",
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
    altPhone: "",
  };
  let exptarr = [];
  const logedin = sessionStorage.getItem("logedin");
  const pharmacyID = sessionStorage.getItem("pharmacy");
  const gridRef = useRef();
  const [data, setData] = useState([]);
  const [completeflag, setCompleteflag] = useState(false);
  const [msg, setMsg] = useState("");
  const [missinginfo, setMissingInfo] = useState([]);
  const [exarraybuilder, setExArrayBuilder] = useState({});
  const [existed, setExisted] = useState([]);
  const [totalcount, setTotal] = useState(0);
  const [missinginfcount, setMissingInfoCount] = useState(0);
  const [existedcount, setExistedCount] = useState(0);
  const [successcount, setSuccessCount] = useState(0);
  const [successflag, setSuccessflag] = useState(false);
  const [loadingflag, setLoadingFlag] = useState("init");
  const [opsendflag, setOpsEndFlag] = useState(false);
  const [timeOutId, setTimeOutId] = useState(0);
  const [dataresolving, setDataResolving] = useState([]);

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    dataresolving.length > 0 && setData([...missinginfo, ...dataresolving]);
  }, [dataresolving, missinginfo]);

  console.log(data);
  console.log(dataresolving);

  useEffect(() => {
    setTotal(data.length);
    setMissingInfoCount(missinginfo.length);
    setExistedCount(existed.length);
    setSuccessCount(
      missinginfo.length === 0 && existed.length === 0
        ? 0
        : data.length - missinginfo.length - existed.length
    );
  }, [data, existed, missinginfo]);

  const handleSubmit = () => {

    clearTimeout(timeOutId);
    setSuccessflag(true);
    setLoadingFlag("loading");

    setMissingInfo(
      data.filter(
        (item) =>
          item.first === "" ||
          item.last === "" ||
          item.DOB === "" ||
          (item.phone === "" && item.email === "")
      )
    );
    
    let newData = [...data];
    let dataholder = newData
      .filter(
        (item) =>
          item.first !== "" &&
          item.last !== "" &&
          item.DOB !== "" &&
          (item.phone !== "" || item.email !== "")
      )
      .map((item) => {
        item.address = [
          {
            name: item.name,
            relation: item.relation,
            street: item.street,
            city: item.city,
            state: item.state,
            zip: item.zip,
          },
        ];
        item.ContactInfo = [
          {
            emName: item.emName,
            emRelation: item.emRelation,
            altPhone: item.altPhone,
          },
        ];
        item.pharmacyID = pharmacyID;
        delete item.note;
        delete item.name;
        delete item.relation;
        delete item.street;
        delete item.city;
        delete item.state;
        delete item.zip;
        delete item.emName;
        delete item.emRelation;
        delete item.altPhone;
        delete item.Line_num;
        return item;
      });

    Promise.all(dataholder).then((values) => {
      //console.log(values);

   let newdataarr =   values.map((ele, ind) => {
        pharmacistHelper
          .addNewPatient(ele)
          .then((res) => {
            if (res.data.message) {
              setSuccessflag(true);
              setLoadingFlag("init");
              ele.success = true;
              ele.note = "Patient Has Been Created!";
              ele.name = ele.address[0].name;
              ele.relation = ele.address[0].relation;
              ele.street = ele.address[0].street;
              ele.city = ele.address[0].city;
              ele.state = ele.address[0].state;
              ele.zip = ele.address[0].zip;
              ele.emName = ele.ContactInfo[0].emName;
              ele.emRelation = ele.ContactInfo[0].emRelation;
              ele.altPhone = ele.ContactInfo[0].altPhone;
              delete ele.address;
              delete ele.ContactInfo;
            }
          })
          .catch((err) => {
            if (
              err.response.data.message &&
              err.response.data.message === "User Exist!"
            ) {
              ele.success = false;
              ele.note = "Patient Already Exists!";
              ele.name = ele.address[0].name;
              ele.relation = ele.address[0].relation;
              ele.street = ele.address[0].street;
              ele.city = ele.address[0].city;
              ele.state = ele.address[0].state;
              ele.zip = ele.address[0].zip;
              ele.emName = ele.ContactInfo[0].emName;
              ele.emRelation = ele.ContactInfo[0].emRelation;
              ele.altPhone = ele.ContactInfo[0].altPhone;
              delete ele.address;
              delete ele.ContactInfo;
              setExArrayBuilder(ele);
              setSuccessflag(true);
              setLoadingFlag("init");
              exptarr.push(ele);
              setExisted([...existed, ...exptarr]);
            } else {
              ele.success = false;
              ele.note = "Faild!";
              ele.name = ele.address[0].name;
              ele.relation = ele.address[0].relation;
              ele.street = ele.address[0].street;
              ele.city = ele.address[0].city;
              ele.state = ele.address[0].state;
              ele.zip = ele.address[0].zip;
              ele.emName = ele.ContactInfo[0].emName;
              ele.emRelation = ele.ContactInfo[0].emRelation;
              ele.altPhone = ele.ContactInfo[0].altPhone;
              delete ele.address;
              delete ele.ContactInfo;
              err?.response?.data?.message && setMsg(err.response.data.message);
            }
          });

        if (ind === values.length - 1) {
          setOpsEndFlag(true);
        }
        return ele;
      });
      setDataResolving(newdataarr);
    });
  };

  const handleReset = () => {
    exptarr = [];
    clearTimeout(timeOutId);
    setMsg("");
    setOpsEndFlag(false);
    setLoadingFlag("init");
    setSuccessflag(false);
    setCompleteflag(false);
    setExisted([]);
    setMissingInfo([]);
    setData([]);
    setTotal(0);
    setSuccessCount(0);
    setExistedCount(0);
    setMissingInfoCount(0);
  };
  //console.log(existed);
  //console.log(missinginfo);
  return (
    <div>
      {" "}
      {logedin ? (
        <div id="wrapper">
          <Nav />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Header />
              <div className="container-fluid">
                <h1>Create Bulk Patients</h1>
              </div>
              <div className="p-2">
                {!completeflag && (
                  <>
                    <p
                      style={{
                        textAlign: "center",
                        border: "2px dotted red",
                        padding: "5px",
                      }}
                    >
                      Please use the template in the link below to import the
                      data. <br />
                      <a href="https://curorx.blob.core.windows.net/curorxcon/1672850045825_template.csv">
                        <i
                          className="fa fa-download "
                          style={{ marginRight: "5px" }}
                        ></i>
                        template
                      </a>
                    </p>
                    <Importer
                      chunkSize={10000}
                      restartable={false}
                      assumeNoHeaders={false}
                      skipEmptyLines={"greedy"}
                      trimFields={true}
                      dataHandler={async (rows) => {
                        // mock timeout to simulate processing
                        await new Promise((resolve) =>
                          setTimeout(resolve, 500)
                        );
                      }}
                      onStart={({ file, preview, fields, columnFields }) => {}}
                      onProgress={({ file, fields, rows, progress }) => {}}
                      processChunk={async (rows) => {
                        setData(
                          rows.map((i, ind) => {
                            i.note = "";
                            i.SSN = ("" + i.SSN.trim()).replace(/\D/g, "");
                            if (i.first.trim() === "") {
                              i.note = `${i.note}, First Name Is Missing`;
                              i.success = false;
                            }
                            if (i.last.trim() === "") {
                              i.note = `${i.note}, Last Name Is Missing`;
                              i.success = false;
                            }
                            if (i.DOB.trim() === "") {
                              i.note = `${i.note},DOB Is Missing`;
                              i.success = false;
                            }
                            if (
                              i.email.trim() === "" &&
                              i.phone.trim() === ""
                            ) {
                              i.note = `${i.note}, Email and Phone Number Are Missing`;
                              i.success = false;
                            }

                            if (i.phone.trim() !== "") {
                              let clean = ("" + i.phone.trim()).replace(
                                /\D/g,
                                ""
                              );
                              let match = clean.match(
                                /^(\d{3})(\d{3})(\d{4})$/
                              );
                              const invcodes = [
                                "800",
                                "888",
                                "877",
                                "866",
                                "855",
                                "844",
                                "833",
                                "800",
                                "888",
                                "877",
                                "866",
                                "855",
                                "844",
                                "833",
                                "001",
                                "011",
                                "002",
                                "000",
                              ];

                              if (match) {
                                if (invcodes.includes(match[1])) {
                                  i.note = `${i.note}, Invalid Phone Number`;
                                  i.phone = "";
                                  i.success = false;
                                } else {
                                  i.phone = `${match[1]}${match[2]}${match[3]}`;
                                }
                              }
                            }

                            if (i.email.trim() !== "") {
                              let validRegex =
                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                              if (!i.email.match(validRegex)) {
                                i.note = `${i.note}, Invalid Email Address`;
                                i.email = "";
                                i.success = false;
                              }
                            }

                            return i;
                          })
                        );

                        // mock timeout to simulate processing
                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                      }}
                      onComplete={({
                        file,
                        preview,
                        fields,
                        columnFields,
                        rows,
                      }) => {
                        setCompleteflag(true);
                      }}
                      onClose={() => {}}
                    >
                      {Object.keys(headers).map((key) => {
                        if (
                          ["first", "last", "email", "phone", "DOB"].includes(
                            key
                          )
                        ) {
                          return (
                            <ImporterField
                              key={key}
                              name={key}
                              label={key.charAt(0).toUpperCase() + key.slice(1)}
                              required
                            />
                          );
                        } else {
                          return (
                            <ImporterField
                              key={key}
                              name={key}
                              label={key.charAt(0).toUpperCase() + key.slice(1)}
                              optional
                            />
                          );
                        }
                      })}
                    </Importer>
                  </>
                )}

                <div
                  className="ag-theme-alpine mt-2"
                  style={{ height: 400, width: "auto" }}
                >
                  {completeflag && (
                    <div
                      style={{
                        textAlign: "center",
                        border: "1px solid red",
                        paddingTop: "10px",
                      }}
                    >
                      <h5>Statistics Board</h5>
                      <ul className="list-group list-group-horizontal justify-content-center mb-2">
                        <li className="list-group-item">
                          Total Patients: {totalcount}
                        </li>
                        <li className="list-group-item">
                          Patients With Missing Info: {missinginfcount}
                        </li>
                        <li className="list-group-item">
                          Patients With Existing Info: {existedcount}
                        </li>
                        <li className="list-group-item">
                          Patients Successfully Created: {successcount}
                        </li>
                      </ul>
                    </div>
                  )}
                  {data.length > 0 && completeflag && (
                    <>
                      <button
                        className=" border-0 btn btn-outline-primary"
                        onClick={() => {
                          handleReset();
                        }}
                      >
                        <i
                          className="fa fa-arrow-left fa-1x"
                          aria-hidden="true"
                        ></i>{" "}
                        Start Over
                      </button>
                      <p style={{ color: "red" }}>{msg}</p>
                      <TableViewer
                        title="Data Preview"
                        content={data}
                        headers={Object.keys(headers)}
                        minHeight={100}
                        maxHeight={400}
                        searchEnabled={true}
                        pagination={50}
                        renderLineNumber={true}
                        activateDownloadButton={true}
                        headerCss={{
                          color: "white",
                          backgroundColor: "#4682b4",
                        }}
                        topPagination={true}
                        caseInsensitive={true}
                        filter={true}
                      />
                      <button
                        className="btn btn-primary m-3 float-end"
                        onClick={() => {
                          setSuccessflag(true);
                          setLoadingFlag("loading");
                          let timeOut = setTimeout(() => {
                            handleSubmit();
                          }, 2000);
                          setTimeOutId(timeOut);
                        }}
                        disabled={successflag}
                      >
                        {loadingflag === "loading" ? (
                          <>
                            <span
                              className="spinner-grow spinner-grow-sm "
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Loading...{" "}
                          </>
                        ) : (
                          <>Submit</>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Logedout />
      )}
    </div>
  );
}

export default BulkCreatePatients;

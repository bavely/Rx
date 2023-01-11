import React from "react";
import { useState, useEffect, useCallback } from "react";
import providerHelper from "../../utils/Provider_Helper";
import AddNewRx from "./AddNewRx";
// import { useDropzone } from "react-dropzone";


export default function PtEditDetails(props) {
  // Google Places
  const [placeId, setPlaceid] = useState("");
  console.log(placeId);
  const [searchValue, setSearchValue] = useState({
    searchAdd: "",
    esearchAdd: "",
  });
  const [predictions, setPredictions] = useState([]);

  console.log(predictions);

  const handleGoogle = (inp) => {
    new Promise((resolve, reject) => {
      if (!inp) {
        return reject("Need valid text input");
      }

      // for use in things like GatsbyJS where the html is generated first
      if (typeof window === "undefined") {
        return reject("Need valid window object");
      }

      try {
        const center = { lat: 50.064192, lng: -130.605469 };
        // Create a bounding box with sides ~10km away from the center point
        const defaultBounds = {
          north: center.lat + 0.1,
          south: center.lat - 0.1,
          east: center.lng + 0.1,
          west: center.lng - 0.1,
        };

        const options = {
          bounds: defaultBounds,
          componentRestrictions: { country: "us" },
          fields: ["address_components", "geometry", "icon", "name"],
          strictBounds: false,
          types: ["address"],
        };

        new window.google.maps.places.AutocompleteService().getPlacePredictions(
          { input: inp, options },
          resolve
        );
      } catch (e) {
        reject(e);
      }
    }).then((results) => {
      console.log(results);
      if (results) {
        setPredictions(results);
      }
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue({ searchAdd: e.target.value });
    handleGoogle(e.target.value);
  };
  const ehandleChange = (e) => {
    e.preventDefault();
    setSearchValue({ esearchAdd: e.target.value });
    handleGoogle(e.target.value);
  };

  const [addressComp, setAddress] = useState({
    street: props.data.Patient_Address,
    state: props.data.Patient_State,
    city: props.data.Patient_City,
    postal: props.data.Patient_Zip_Code,
  });

  console.log(addressComp);

  const handleSelect = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(predictions);
    predictions.some((obj) => {
      if (e.target.value === obj.description) {
        let placeId = obj.place_id;
        new Promise((resolve, reject) => {
          if (!placeId) reject("placeId not provided");
          try {
            new window.google.maps.places.PlacesService(
              document.createElement("div")
            ).getDetails(
              {
                placeId,
                fields: ["address_components"],
              },
              (details) => {
                let dob = {};
                let addDetails = details.address_components.map((obj) => {
                  if (obj.types[0] === "street_number") {
                    dob.streetnum = obj.short_name;
                  }
                  if (obj.types[0] === "route") {
                    dob.streetname = obj.short_name;
                  }
                  if (obj.types[0] === "postal_code") {
                    dob.postal_code = obj.short_name;
                  }

                  if (obj.types[0] === "locality") {
                    dob.city = obj.short_name;
                  }
                  if (obj.types[0] === "administrative_area_level_1") {
                    dob.state = obj.short_name;
                  }

                  return dob;
                });

                setAddress({
                  street: `${dob.streetnum} ${dob.streetname}`,
                  state: dob.state,
                  city: dob.city,
                  postal: dob.postal_code,
                });
                console.log(details);
                console.log(dob);
                // return resolve(postcode)
              }
            );
          } catch (e) {
            reject(e);
          }
        });
        return true;
      }
    });
    console.log(placeId);

    setPredictions([]);
  };

  const [eaddressComp, seteAddress] = useState({
    street: props.data.Patient_Address,
    state: props.data.Patient_State,
    city: props.data.Patient_City,
    postal: props.data.Patient_Zip_Code,
  });

  const handleSelecte = (e) => {
    e.preventDefault();

    predictions.some((obj) => {
      if (e.target.value === obj.description) {
        let placeId = obj.place_id;
        new Promise((resolve, reject) => {
          if (!placeId) reject("placeId not provided");
          try {
            new window.google.maps.places.PlacesService(
              document.createElement("div")
            ).getDetails(
              {
                placeId,
                fields: ["address_components"],
              },
              (details) => {
                let dob = {};
                let addDetails = details.address_components.map((obj) => {
                  if (obj.types[0] === "street_number") {
                    dob.streetnum = obj.short_name;
                  }
                  if (obj.types[0] === "route") {
                    dob.streetname = obj.short_name;
                  }
                  if (obj.types[0] === "postal_code") {
                    dob.postal_code = obj.short_name;
                  }

                  if (obj.types[0] === "locality") {
                    dob.city = obj.short_name;
                  }
                  if (obj.types[0] === "administrative_area_level_1") {
                    dob.state = obj.short_name;
                  }

                  return dob;
                });

                seteAddress({
                  street: `${dob.streetnum} ${dob.streetname}`,
                  state: dob.state,
                  city: dob.city,
                  postal: dob.postal_code,
                });
                console.log(details);
                console.log(dob);
                // return resolve(postcode)
              }
            );
          } catch (e) {
            reject(e);
          }
        });
        return true;
      }
    });
    setPredictions([]);
  };
  // AIzaSyCdvs-wne1yO5PmNUtFS-2_8nLCpw54zLE
  //AIzaSyDykdFJ16oofV-O-VfrY5hUjq-GcT_bmJw
  // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const ProviderId = sessionStorage.getItem("user");
  const [patient, setPatient] = useState({
    ID: props.data.pt_id,
    Provider_ID: ProviderId,
    First_Name: props.data.firstName,
    Last_Name: props.data.lastName,
    DOB: props.data.DOB,
    Patient_Insurance_Carrier: props.data.insuranceCarrier,
    Gender: props.data.gender,
    Race: props.data.race,
    Height: props.data.height,
    Weight: props.data.weight,
    Allergies: props.data.allergies,
    Email: props.data.email,
    Address: props.data.address_1,
    City: props.data.city,
    State: props.data.state,
    Zip_Code: props.data.zipCode,
    Mobile_Number: props.data.phoneNumber_1,
  });
  console.log(props);
  useEffect(() => {
    return () => {
      setPatient({
        ID: props.data.pt_id,
        Provider_ID: ProviderId,
        First_Name: props.data.firstName,
        Last_Name: props.data.lastName,
        DOB: props.data.DOB,
        Patient_Insurance_Carrier: props.data.insuranceCarrier,
        Gender: props.data.gender,
        Race: props.data.race,
        Height: props.data.height,
        Weight: props.data.weight,
        Allergies: props.data.allergies,
        Email: props.data.email,
        Address: props.data.address_1,
        City: props.data.city,
        State: props.data.state,
        Zip_Code: props.data.zipCode,
        Mobile_Number: props.data.phoneNumber_1,
      });
    };
  }, [props, ProviderId]);

  const [addedPt, setAddedpt] = useState({});
  const [randFlag, setFlag] = useState("");

  function onChange(event){
    event.preventDefault();
    setPatient({...patient,[event.target.name]: event.target.value})
  }

  function handleSubmit(event) {
    
    console.log(patient);
    event.preventDefault();
    setFlag("loading");
    if (Object.values(ptfiles).length > 0) {
      const formData = new FormData();
      Object.values(ptfiles).forEach((obj) => {
        formData.append("file", obj);
      });
      formData.append("Pt_ID", patient.ID);
      providerHelper.addFiles(formData).then((filecreated) => {
        if (filecreated.data) {
          // providerHelper.storeFilesName(filecreated.data, info.ID);
          patient.file_url = filecreated.data
        }
      });
    }
    const info = { ...addressComp, ...patient };
    
   
      
      providerHelper.handleEditpt(info).then((res) => {
        console.log(info);
        console.log(res);
        if (res.res.data.message === "your infromation has successfully updated.") {

          console.log(res);
          setAddedpt(res.res.m);
          setFlag(res.res.data.message);
          console.log(res.res.data.pt_update) 
          sessionStorage.setItem("pt",JSON.stringify (res.res.data.pt_update));
        } else {
          setFlag(res.res.data.message);
        }
      });
    
  }

  const [ptfiles, setPtfiles] = useState([]);
  console.log(ptfiles);
  const onDrop = (event) => {
    event.preventDefault();
    // Do something with the files
    console.log(event.target.files[0]);

    setPtfiles(event.target.files);
  };

  return (
      <div className="container newPatientDemo">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">{randFlag}</div>
          <div className="col">
            <label htmlFor="First_Name" className="form-label">
              First Name:
            </label>
            <input
                type="text"
                className="form-control"
                name="First_Name"
                placeholder="First Name"
                value={patient.First_Name}
                disabled
            />
          </div>
          <div className="col">
            <label htmlFor="Last_Name" className="form-label">
              {" "}
              Last Name:{" "}
            </label>
            <input
                type="text"
                name="Last_Name"
                className="form-control"
                placeholder="Last Name"
                value={patient.Last_Name}
                disabled
            />
          </div>
          <div className="col">
            <label htmlFor="DOB" className="form-label">
              {" "}
              Date of Birth:{" "}
            </label>
            <input
                type="Date"
                name="DOB"
                className="form-control"
                placeholder="MM/DD/YYY"
                value={patient.DOB}
                disabled
            />
          </div>
          <div className="col">
            <label htmlFor="Gender" className="form-label">
              {" "}
              Gender:{" "}
            </label>

            <select
                name="Gender"
                className="form-control"
                onChange={onChange}
                defaultValue={patient.Gender}
            >
              <option>{patient.Gender}</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          {/* <input type="text" name="Gender" placeholder="Gender" value={patient.Gender} onChange={handleChange} /> */}
          <div className="col">
            <label htmlFor="Race" className="form-label">
              {" "}
              Ethnicity:{" "}
            </label>
            <select
                name="Race"
                className="form-control"
                defaultValue={patient.Race}
                onChange={onChange}
            >
              <option>{patient.Race}</option>
              <option>White</option>
              <option>African American</option>
              <option>Hispanic</option>
              <option>Asian</option>
              <option>Other</option>
            </select>
            {/* <input
                type="text"
                name="Race"
                className="form-control"
                placeholder="Race"
              /> */}

          </div>
          <div className="col">
            <label htmlFor="Height" className="form-label">
              Height:
            </label>
            <input
                type="text"
                name="Height"
                className="form-control"
                placeholder="Height"
                value={patient.Height}
                onChange={onChange}
            />

          </div>
          <div className="col">
            <label htmlFor="Weight" className="form-label">
              {" "}
              Weight:
            </label>
            <input
                type="text"
                name="Weight"
                className="form-control"
                placeholder="Weight"
                value={patient.Weight}
                onChange={onChange}
            />

          </div>
          <div className="col">
            <label htmlFor="Patient_Insurance_Carrier" className="form-label">
              {" "}
              Insurance Carrier:
            </label>
            <input
                type="text"
                name="Patient_Insurance_Carrier"
                placeholder="Insurance Carrier"
                className="form-control"
                value={patient.Patient_Insurance_Carrier}
                onChange={onChange}
            />


          </div>
          <div className="col">
            <label htmlFor="Allergies" className="form-label">
              {" "}
              Allergies:{" "}
            </label>
            <input
                type="text"
                name="Allergies"
                className="form-control"
                placeholder="Please list all allergies here"
                value={patient.Allergies}
                onChange={onChange}
            />

          </div>
          <div className="col">
            <label htmlFor="exampleDataList" className="form-label">
              Full Address Line
            </label>
            <input
                onSelect={handleSelect}
                className="form-control"
                list="add"
                id="exampleDataList"
                placeholder="Type to search..."
                name="predictionSearch"
                value={searchValue.searchAdd}
                onChange={handleChange}
            />
            <datalist id="add">
              {predictions.map((obj, i) => {
                return <option key={obj.place_id}>{obj.description}</option>;
              })}
            </datalist>
          </div>
          <div className="col">
            <label htmlFor="Address" className="form-label">
              Street Address:
            </label>
            <input
                type="text"
                name="Address"
                placeholder="Street Address"
                className="form-control "
                value={addressComp.street ? addressComp.street : patient.Address}
                autoComplete="off"
            />
            <div className="col-md-6"></div>


          </div>
          <div className="col">
            <label htmlFor="City" className="form-label">
              City:
            </label>
            <input
                type="text"
                name="City"
                placeholder="City"
                className="form-control"
                value={addressComp.city ? addressComp.city : patient.City}
                autoComplete="off"
            />

          </div>
          <div className="col">
            <label htmlFor="State" className="form-label">
              State:
            </label>
            <input
                type="text"
                name="State"
                placeholder="State"
                className="form-control"
                value={addressComp.state ? addressComp.state : patient.State}
                autoComplete="off"
            />

          </div>
          <div className="col">
            <label htmlFor="Zip_Code" className="form-label">
              ZIP:
            </label>
            <input
                type="text"
                name="Zip_Code"
                placeholder="Zip Code"
                className="form-control"
                value={addressComp.postal ? addressComp.postal : patient.Zip_Code}
                autoComplete="off"
            />

          </div>
          <div className="col">
            <label htmlFor="Email" className="form-label">
              E-MAIL:
            </label>
            <input
                type="email"
                name="Email"
                placeholder="E-mail Address"
                className="form-control"
                value={patient.Email}
                onChange={onChange}
                autoComplete="off"
            />

          </div>
          <div className="col">
            <label htmlFor="Mobile_Number" className="form-label">
              Mobile Number:
            </label>
            <input
                type="tel"
                name="Mobile_Number"
                placeholder="##########"
                className="form-control"
                value={patient.Mobile_Number}
                onChange={onChange}
            />

          </div>
          <div className="col">
            <label htmlFor="front" className="form-label">
              Choose File
            </label>
            <input
                className="form-control"
                type="file"
                name="front"
                multiple
                onChange={onDrop}
                id="formFile"/>

          </div>
          <div className="col">

            <ul className="list-group">
              {Object.values(ptfiles).map((file, i) => {
                return (
                    <li className="list-group-item" key={i}>
                      {file.name}
                    </li>
                );
              })}
            </ul>
          </div>
          <br/>
        </form>
      </div>

  );
}


import axios from "axios";
import CryptoJS from "crypto-js";
import sha256 from "crypto-js/sha256";
import helper from "./helper";
import { v4 as uuidv4 } from "uuid";
import { randomPassword } from "secure-random-password";
const providerHelper = {
  handleRegister: (info) => {
    console.log(info);
    return axios
      .post(`${helper.backEndBaseUrl}/auth/register`, {
        role: info.role,
        NPI: info.npi,
        firstName: info.first_name,
        lastName: info.last_name,
        email: info.Email,
        password: info.Password,
        StateLicense: info.license,
        address_1: info.address,
        city: info.city,
        state: info.state,
        zipCode: info.postal_code,
        phoneNumber_1: info.telephone_number,
        faxNumber: info.fax_number,
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  NPI: (npi, fname, lname) => {
    return axios
      .post(`${helper.frontEndBaseUrl}/api/npi`, { npi, fname, lname })
      .then((res) => {
        
        
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  getProfile: (id) => {
    return axios
      .get(`${helper.backEndBaseUrl}/user/${id}`)
      .then((res) => {
        console.log(res, "User Profile from helper");
        // const authUser = res.data.Result;
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },

  getAllReferrals: (Id) => {
    return axios
      .post(`${helper.backEndBaseUrl}/prov/get_referrals`, {
        provider_id: Id,
      })

      .then((res) => {
        console.log(res);
        // console.log(helper.tokenSwith, "from get referral request");
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  handleProfileUpdate: (id, payload) => {
    payload.ContactInfo = [];
    console.log(payload);
    return axios
      .put(`${helper.backEndBaseUrl}/user/${id}`, payload)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },

  getPatients: (providerId) => {
    return axios
      .get(`${helper.backEndBaseUrl}/provider/${providerId}/patients`)
      .then((res) => {
        console.log(res);

        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  updatePatientInfo: (Patient_id, payload) => {
    return axios.put(
      `${helper.backEndBaseUrl}/provider/patient/${Patient_id}`,
      payload
    );
  },
  handleGetpttorx: (fname, lname, DOB) => {
    console.log(DOB);
    return axios
      .post(`${helper.backEndBaseUrl}/prov/get_pat`, {
        firstName: fname,
        lastName: lname,
        DOB: DOB,
      })
      .then((res) => {
        console.log(res);

        return res;
      })
      .catch((err) => {
        console.log(err);
        return { err: "Patinet Not Found" };
      });
  },
  handleAddptAssign: (pt) => {
    console.log(pt);
    const rand = randomPassword({ length: 10 });
    console.log(rand);

    return axios
      .post(`${helper.backEndBaseUrl}/prov/add_patient`, {
        firstName: pt.firstName,
        lastName: pt.lastName,
        email: pt.email,
        password: pt.password,
        role: 2,
        address_1: pt.address_1,
        address_2: pt.address_2,
        city: pt.city,
        state: pt.state,
        zipCode: pt.zipCode,
        keyContact: "Ramy Samir",
        phoneNumber_1: pt.phoneNumber_1,
        phoneNumber_2: pt.phoneNumber_2,
        ER_PhoneNumber: pt.ER_PhoneNumber,
        ER_Name: pt.ER_Name,
        ER_Relation: pt.ER_Relation,
        ER_Address: pt.ER_Address,
        ER_City: pt.ER_City,
        ER_State: pt.ER_State,
        ER_Zipcode: pt.ER_Zipcode,
        DOB: pt.DOB,
        race: pt.race,
        gender: pt.gender,
        height: pt.height,
        weight: pt.weight,
        allergies: pt.allergies,
        SSN: pt.SSN,
        insuranceProvider: "djfbjdfj",
        insuranceEmployer: "dmfjbjdfk",
        insuranceCarrier: "fdjhguidfh",
        insurancePolicyGroup: "dsnkfjfg",
        insuranceID: "65+656",
        insuranceBin: "566544",
        insurancePCN: "5454",
        insurancePhone: "548549",
        providerID: pt.Provider_ID,
        PharmacistID: "5",
        file_url: pt.file_url === undefined ? [] : pt.file_url,
      })
      .then((res) => {
        console.log(res);

        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  handleAddpt: (pt) => {
console.log(pt)
    return axios
      .post(`${helper.backEndBaseUrl}/provider/patient`, pt)
      .then((res) => {
        console.log(res);

        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },

  addFiles: (ptfiles) => {
    console.log(ptfiles);
    return axios
      .post("/api/createFile", ptfiles,  {   headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((res) => {
        console.log(res);
        return res;
        // const url = res.data.map((e) => {
        //   return window.URL.createObjectURL(new Blob([e]));
        // });
        // console.log(url);
        
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    console.log(ptfiles);
  },

  
  handleEditpt: (pt) => {
    console.log(pt);
    console.log({
      providerID: pt.Provider_ID,
      firstName: pt.First_Name,
      lastName: pt.Last_Name,
      DOB: pt.DOB,
      gender: pt.Gender,
      race: pt.Race,
      height: pt.Height,
      weight: pt.Weight,
      insuranceCarrier: pt.Patient_Insurance_Carrier,
      allergies: pt.Allergies,
      email: pt.Email,
      address_1: pt.street === undefined ? pt.Address : pt.street,
      city: pt.city === undefined ? pt.City : pt.city,
      state: pt.state === undefined ? pt.State : pt.state,
      zipCode: pt.postal === undefined ? pt.Zip_Code : pt.postal,
      phoneNumber_1: pt.Mobile_Number,
      file_url: pt.file_url === undefined ? [] : pt.file_url,
    });
    return axios
      .put(`${helper.backEndBaseUrl}/prov/upd_pat`, {
        providerID: pt.Provider_ID,
        firstName: pt.First_Name,
        lastName: pt.Last_Name,
        DOB: pt.DOB,
        gender: pt.Gender,
        race: pt.Race,
        height: pt.Height,
        weight: pt.Weight,
        insuranceCarrier: pt.Patient_Insurance_Carrier,
        allergies: pt.Allergies,
        email: pt.Email,
        address_1: pt.street === undefined ? pt.Address : pt.street,
        city: pt.city === undefined ? pt.City : pt.city,
        state: pt.state === undefined ? pt.State : pt.state,
        zipCode: pt.postal === undefined ? pt.Zip_Code : pt.postal,
        phoneNumber_1: pt.Mobile_Number,
        file_url: pt.file_url === undefined ? [] : pt.file_url,
      })
      .then((res) => {
        return {
          res,
          m: {
            providerID: pt.Provider_ID,
            firstName: pt.First_Name,
            lastName: pt.Last_Name,
            DOB: pt.DOB,
            gender: pt.Gender,
            race: pt.Race,
            height: pt.Height,
            weight: pt.Weight,
            insuranceCarrier: pt.Patient_Insurance_Carrier,
            allergies: pt.Allergies,
            email: pt.Email,
            address_1: pt.street === undefined ? pt.Address : pt.street,
            city: pt.city === undefined ? pt.City : pt.city,
            state: pt.state === undefined ? pt.State : pt.state,
            zipCode: pt.postal === undefined ? pt.Zip_Code : pt.postal,
            phoneNumber_1: pt.Mobile_Number,
            file_url: pt.file_url === undefined ? [] : pt.file_url,
          },
        };
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
 

};

export default providerHelper;

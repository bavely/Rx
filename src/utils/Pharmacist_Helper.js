import axios from "axios";
import { randomPassword } from "secure-random-password";
import helper from "./helper";

const pharmacistHelper = {
  handleRegister: (info) => {
    //  parseInt(info.PharmacyName, 10)
    console.log({
      pharmacy_id: parseInt(info.PharmacyName, 10),
      firstName: info.first_name,
      lastName: info.last_name,
      email: info.Email,
      password: info.Password,
      role: 2,
      NPI: info.NPI,
      Team: info.Team,
      License_Number: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
    });
    return axios
      .post(`${helper.backEndBaseUrl}/auth/register/pharmacist`, {
        pharmacy_id: parseInt(info.PharmacyName, 10),
        firstName: info.first_name,
        lastName: info.last_name,
        email: info.Email,
        password: info.Password,
        role: 2,
        NPI: info.NPI,
        Team: info.Team,
        License_Number: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
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
  getProfile: (id) => {
    return (
      axios
        .get(`${helper.backEndBaseUrl}/user/${id}`)
        // .post(`${helper.backEndBaseUrl}/phar/prof`, { id: id })
        .then((res) => {
          // const authUser = res.data.Result;
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        })
    );
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
  handleEmailUpdate: (email, pass, Id) => {
    // const cipherranpass = helper.handleEncryption(pass);

    return axios
      .put(`${helper.backEndBaseUrl}/phar/upd_prof`, {
        id: Id,
        email: email,
        password: pass,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  handleAddressUpdate: (address, city, state, zip, Id) => {
    console.log(address, city, state, zip, Id);

    return axios
      .put(`${helper.backEndBaseUrl}/phar/upd_prof`, {
        id: Id,
        address: address,
        city: city,
        state: state,
        zipCode: zip,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err, "error");
        return err;
      });
  },
  handlePhoneUpdate: (Id, phone) => {
    return axios
      .put(`${helper.backEndBaseUrl}/phar/upd_prof`, {
        id: Id,
        phoneNumber: phone,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  handlePasswordUpdate: (opass, npass, Id) => {
    // const cipheropass = helper.handleEncryption(opass);
    // const ciphernpass = helper.handleEncryption(npass);

    return axios
      .put(`${helper.backEndBaseUrl}/phar/upd_prof`, {
        id: Id,
        password: npass,
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
  handleTeamUpdate: (Id, Team) => {
    console.log(Team);
    return axios
      .put(`${helper.backEndBaseUrl}/phar/upd_prof`, {
        id: Id,
        Team: Team,
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
  getProviders: (id) => {
    return axios.get(
      `${helper.backEndBaseUrl}/provider/pharmacy/${id}/providers`
    );
  },
  handleEditpr: (provider) => {
    return axios
      .put(`${helper.backEndBaseUrl}/phar/updProvider`, {
        id: provider.id,
        firstName: provider.First_Name,
        lastName: provider.Last_Name,
        email: provider.email,
        address_1: provider.Address,
        city: provider.City,
        state: provider.State,
        zipCode: provider.Zip_Code,
        phoneNumber_1: provider.Mobile_Number,
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
  getPatients: (id) => {
    return axios.get(
      `${helper.backEndBaseUrl}/patient/pharmacy/${id}/patients`
    );
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
      .put(`${helper.backEndBaseUrl}/phar/upd_pat`, {
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
  handleSearchProvider: (search) => {
    console.log(search);

    const objTosend = {};
    Object.keys(search)
      .filter((key) => search[key] !== "")
      .map((key) => (objTosend[key] = search[key]));

    console.log(objTosend);
    return axios
      .post(`${helper.backEndBaseUrl}/phar/get_pro`, objTosend)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  handleSearchPatient: (search) => {
    console.log(search);
    return axios
      .post(`${helper.backEndBaseUrl}/prov/get_pat`, {
        firstName: search.firstName,
        lastName: search.lastName,
        DOB: search.DOB,
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
  handleAddReferral: (referral) => {
    console.log(referral);
    return axios
      .post(`${helper.backEndBaseUrl}/phar/add_ref`, referral)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  handleAddPatient: (pt) => {
    console.log(pt);
    const rand = randomPassword({ length: 10 });

    if (pt.Email === "") {
      pt.Email = `${randomPassword({ length: 12 })}@tempemail.com`;
    }
    return axios
      .post(`${helper.backEndBaseUrl}/prov/add_patient`, {
        firstName: pt.firstName,
        lastName: pt.lastName,
        email: pt.email,
        password: rand,
        role: 3,
        address_1: pt.address_1,
        address_2: pt.address_2,
        city: pt.city,
        state: pt.state,
        zipCode: pt.zipCode,
        keyContact: " ",
        phoneNumber_1: pt.phoneNumber_1,
        phoneNumber_2: pt.phoneNumber_2,
        ER_PhoneNumber: "",
        ER_Name: "",
        ER_Relation: "",
        ER_Address: "",
        ER_City: "",
        ER_State: "",
        ER_Zipcode: "",
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
        providerID: pt.providerID,
        PharmacistID: pt.pharmacistID,
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
  handleAddProvider: (provider) => {
    return axios
      .post(`${helper.backEndBaseUrl}/phar/addProvider`, provider)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  handleGetRx: () => {
    return axios
      .get(`${helper.backEndBaseUrl}/phar/get_referrals`)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },

  addNewPatient: (payload) => {
    return axios.post(`${helper.backEndBaseUrl}/patient/patient`, payload);
  },

  addNewProvider: (payload) => {
    return axios.post(`${helper.backEndBaseUrl}/provider/provider`, payload);
  },

  updateProviderInfo: (prvider_id, payload) => {
    return axios.put(
      `${helper.backEndBaseUrl}/provider/provider/${prvider_id}`,
      payload
    );
  },

  updatePatientInfo: (Patient_id, payload) => {
    return axios.put(
      `${helper.backEndBaseUrl}/patient/patient/${Patient_id}`,
      payload
    );
  },

  getUserMessages: (user_id) => {
    return axios.get(
      `${helper.backEndBaseUrl}/message/channel/${user_id}/messages`
    );
  },
  getPriv: (Role) => {
    return axios.get(
      `${helper.backEndBaseUrl}/pharmacyAdmin/role/${Role}/privileges`
    );
  },
};

export default pharmacistHelper;

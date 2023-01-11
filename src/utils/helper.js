import axios, { Axios } from "axios";
import CryptoJS from "crypto-js";
import sha256 from "crypto-js/sha256";
import { randomPassword } from "secure-random-password";
import providerHelper from "./Provider_Helper";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

console.log(process.env.REACT_APP_ENV, "process.env.REACT_APP_ENV");
const helper = {
  frontEndBaseUrl:
    process.env.REACT_APP_ENV === "prod"
      ? "https://curorx.life"
      : process.env.REACT_APP_ENV === "beta"
      ? "https://curo-frontend-beta.azurewebsites.net"
      : "http://localhost:8080",

  fireBaseURL:
    process.env.REACT_APP_ENV === "prod"
      ? { surveys: "surveys", tokens: "tokens", users: "users" }
      : process.env.REACT_APP_ENV === "beta"
      ? { surveys: "surveysbeta", tokens: "tokensbeta", users: "usersbeta" }
      : { surveys: "surveysbeta", tokens: "tokensbeta", users: "usersbeta" },
  handlePrivateRoutes: (isAuth = false) => {
    return isAuth ? <Outlet /> : <Navigate to="/" />;
  },

  handleAuth: (payload) => {
    //console.log(payload, "payload");
    return axios
      .post(`${helper.backEndBaseUrl}/auth/login`, payload)
      .then((res) => {
        //console.log(res);
        return res;
      });
  },

  handleEmailCheck: (email) => {
    //console.log(email);
    /* 1- Search for the email
                        2-if there is a match genrat temp pass and update the DB and email it to the user
                        3- if no match inform the user */
    return axios
      .post(`${helper.backEndBaseUrl}/prov/check_email`, {
        email: email,
      })
      .then((res) => {
        // const authUser = res.data.Result;
        //console.log(res);
        return res;
      })
      .catch((err) => {
        //console.log(err);
        return err;
      });
  },

  handleEncryption: (plainTxt) => {
    var ciphertext = sha256(plainTxt).toString();
    //console.log(ciphertext);
    return ciphertext;
  },

  handleEmail: (email, TempPassword) => {
    //console.log("here");
    // https://curorx.wl.r.appspot.com
    // http://localhost:8080
    return axios
      .post("/api/resetpassword", {
        email,
        TempPassword,
      })
      .then((res) => {
        //console.log(res);
        return res;
      })
      .catch((err) => {
        //console.log(err);
        return err;
      });
  },
  emailVerifier: (email) => {
    return axios
      .get(
        `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=d28279f2eb082bff25b69ffe0bbe994e8aa5d033`
      )
      .then((res) => {
        //console.log(res);
        return res;
      })
      .catch((err) => {
        //console.log(err);
        return err;
      });
  },
  handleDecryption: (ciphertext, key) => {
    var bytes = sha256(ciphertext, key);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  },

  handleRanPass: (email) => {
    return axios
      .put(`${helper.backEndBaseUrl}/auth/resetPassword`, {
        email: email,
        phone: "",
      })
      .then((res) => {
        //console.log(res);
        return res;
      })
      .catch((err) => {
        //console.log(err.response);
        return err.response;
      });
  },

  handleEmail: (email, TempPassword) => {
    //console.log("here");
    return axios
      .post(`${helper.frontEndBaseUrl}/api/resetpassword`, {
        email,
        TempPassword,
      })
      .then((res) => {
        //console.log(res);
        return res;
      })
      .catch((err) => {
        //console.log(err);
        return err;
      });
  },

  // tokenSwith: "",
  handleDiag: () => {
    return axios.get(`${helper.backEndBaseUrl}/prov/get_diag`).then((res) => {
      return { res };
    });
  },

  getDrug: (name) => {
    //console.log(name, "here");
    return axios
      .get(
        `https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"${name}"`
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  addReferral: (ref) => {
    //console.log(ref, "here");
    return axios
      .post(`${helper.backEndBaseUrl}/prov/add_ref`, ref)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  contactUs: (data) => {
    return axios
      .post("/api/contactus", data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleStoringCodes: (codes) => {
    //console.log(codes);
    return axios
      .post(`${helper.backEndBaseUrl}/pharmacyAdmin/generateCode`, codes)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleGetCodes: (id) => {
    return axios
      .get(
        `${helper.backEndBaseUrl}/pharmacyAdmin/pharmacyID/${id}/generatedCodes`
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleCodeVerification: (code) => {
    //console.log(code);
    return axios
      .post(`${helper.backEndBaseUrl}/admin/CheckValidation`, {
        code: code,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleDeleteCode: (code) => {
    //console.log(code);
    return axios
      .delete(`${helper.backEndBaseUrl}/admin/deleteCode`, {
        data: { code },
      })

      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleAddresses: (addresses) => {
    if (addresses === undefined || addresses === null || addresses === "") {
      return null;
    } else {
      const handleGoogle = (inp) => {
        if (inp === "" || inp === null || inp === undefined) {
          return [];
        } else {
          return new Promise((resolve, reject) => {
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

              return new window.google.maps.places.AutocompleteService().getPlacePredictions(
                { input: inp, options },
                resolve
              );
            } catch (e) {
              reject(e);
            }
          }).then((results) => {
            //console.log(results);
            if (results) {
              return results.map((obj) => {
                let placeId = obj.place_id;
                return new Promise((resolve, reject) => {
                  if (!placeId) reject("placeId not provided");
                  try {
                    return new window.google.maps.places.PlacesService(
                      document.createElement("div")
                    ).getDetails(
                      {
                        placeId,
                        fields: ["address_components"],
                      },
                      (details) => {
                        if (details) {
                          return resolve(details.address_components);
                        } else {
                          return null;
                        }
                      }
                    );
                  } catch (e) {
                    reject(e);
                  }
                });
              });
            }
          });
        }
      };

      return handleGoogle(addresses).then((res) => {
        if (res === null || res === undefined) {
          return [];
        } else {
          //console.log(res);
          return Promise.all(res).then((a) => {
            //console.log(a);
            return a.map((i) => {
              //console.log(i);
              let dob = {};
              i.map((obj) => {
                if (obj.types[0] === "street_number") {
                  dob.streetnum = obj.short_name;
                }
                if (obj.types[0] === "route") {
                  dob.streetname = obj.short_name;
                }
                if (obj.types[0] === "postal_code") {
                  dob.postal_code = obj.short_name;
                }

                if (
                  obj.types[0] === "locality" ||
                  obj.types[0] === "sublocality_level_1"
                ) {
                  dob.city = obj.short_name;
                }
                if (obj.types[0] === "administrative_area_level_1") {
                  dob.state = obj.short_name;
                }
              });
              return {
                street: `${dob.streetnum} ${dob.streetname}`,
                state: dob.state,
                city: dob.city,
                postal: dob.postal_code,
              };
            });
          });
        }
      });
    }
  },
  handleGetChannels: (user_id) => {
    //console.log(user_id);
    return axios
      .get(`${helper.backEndBaseUrl}/message/sender/${user_id}/channels`)
      .then((res) => {
        //console.log(res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleCreateChannel: (data) => {
    return axios
      .post(`${helper.backEndBaseUrl}/admin/createChannel`, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleCheckChannel: (info) => {
    return axios
      .post(`${helper.backEndBaseUrl}/message/messages`, info)
      .then((res) => {
        //console.log(res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleGetMessages: (data) => {
    return axios
      .get(
        `${helper.backEndBaseUrl}/message/channel/${data.channel_id}/messages`
      )
      .then((res) => {
        //console.log(res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleSendMessage: (data) => {
    //console.log(data);
    return axios
      .post(`${helper.backEndBaseUrl}/message/message`, data)
      .then((res) => {
        //console.log(res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleSms: (data) => {
    //console.log(data);
    return axios
      .post(`${helper.frontEndBaseUrl}/api/sms`, data)
      .then((res) => {
        //console.log(res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  handleMassText: (data) => {
    return axios.post(`${helper.frontEndBaseUrl}/api/mass-text`, data);
  },

  handleSendEmail: (data) => {
    return axios
      .post(`${helper.frontEndBaseUrl}/api/sendemail`, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  validatePharmacy: async (BIN) => {
    return await axios
      .post(`${helper.backEndBaseUrl}/auth/validatePharmacy`, BIN)
      .then((resp) => {
        return resp;
      });
  },
  validateUser: async (code) => {
    return await axios
      .post(`${helper.backEndBaseUrl}/auth/validateUser`, code)
      .then((resp) => {
        return resp;
      });
  },
  userRegister: async (user) => {
    return await axios
      .post(`${helper.backEndBaseUrl}/auth/register`, user)
      .then((resp) => {
        return resp;
      });
  },
  registerUserToPharmacy: async (user) => {
    return await axios
      .post(`${helper.backEndBaseUrl}/auth/addUserToPharmacy`, user)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return err;
      });
  },
  getAllusers: (phId) => {
    return axios
      .get(`${helper.backEndBaseUrl}/message/pharmacy/${phId}/users`)
      .then((resp) => {
        //console.log(resp);
        return resp;
      })
      .catch((err) => {
        return err;
      });
  },
  handleFiles: (data) => {
    //console.log(data);
    return axios
      .post(`${helper.frontEndBaseUrl}/savefiles`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default helper;

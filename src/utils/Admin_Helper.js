import axios from "axios";
import helper from "./helper";

const adminHelper = {
  handleAddPharmacy: (pharmacy) => {
    return axios
      .post(`${helper.backEndBaseUrl}/admin/addPharmacy`, pharmacy)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleAddPrivilege: (privilege) => {
    return axios
      .post(`${helper.backEndBaseUrl}/admin/addPrivilege`, privilege)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleGetPrivileges: () => {
    return axios
      .get(`${helper.backEndBaseUrl}/admin/getPrivileges`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleGetPharmacies: () => {
    return axios
      .get(`${helper.backEndBaseUrl}/admin/getPharmacies`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleGetAdmins: (id) => {
    return axios
      .get(`${helper.backEndBaseUrl}/Admin/pharmacy/${id}/admins`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getPharmaPrivileges: (id) => {
    return axios
      .get(`${helper.backEndBaseUrl}/Admin/pharmacy/${id}/privileges`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleAddAdmin: (admin) => {
    return axios
      .post(`${helper.backEndBaseUrl}/admin/addPharmacyAdmin`, admin)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleAddUser: (user) => {
    return axios
      .post(`${helper.backEndBaseUrl}/pharmacyAdmin/addUser`, user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleGetUsers: (pharmacy_id) => {
    return axios
      .get(
        `${helper.backEndBaseUrl}/pharmacyAdmin/pharmacy/${pharmacy_id}/users`
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleGetRoles: (pharmacy_id) => {
    return axios
      .get(
        `${helper.backEndBaseUrl}/pharmacyAdmin/pharmacy/${pharmacy_id}/roles`
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleGetPrivOfRole: (role_id) => {
    return axios
      .get(`${helper.backEndBaseUrl}/pharmacyAdmin/role/${role_id}/privileges`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleGetAllPrivileges: (pharmacy_id) => {
    return axios
      .get(
        `${helper.backEndBaseUrl}/pharmacyAdmin/pharmacy/${pharmacy_id}/privileges`
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleUpdateRolePrivileges: (items) => {
    return axios
      .post(`${helper.backEndBaseUrl}/pharmacyAdmin/addPrivilegeToRole`, items)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleUpdatePharmaPrivileges: (items) => {
    return axios
      .post(`${helper.backEndBaseUrl}/Admin/addPrivToPharmacy`, items)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleAddRole: (role) => {
    return axios
      .post(`${helper.backEndBaseUrl}/pharmacyAdmin/addRole`, role)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getUserRole: (user_id) => {
    return axios
      .get(`${helper.backEndBaseUrl}/pharmacyAdmin/user/${user_id}/role`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleUpdateUserRole: (items) => {
    return axios
      .put(`${helper.backEndBaseUrl}/pharmacyAdmin/user/${items.userID}/role`, {
        roleID: items.roleID,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getPhadminProfile: (id) => {
    return axios
      .get(`${helper.backEndBaseUrl}/pharmacyAdmin/profile/${id}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getSadminProfile: (id) => {
    return axios
      .get(`${helper.backEndBaseUrl}/admin/profile/${id}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleAddUserRole: (items) => {
    return axios
      .post(`${helper.backEndBaseUrl}/pharmacyAdmin/addRoleToUser`, items)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  handleUpdatePhadminProfile: (id, items) => {
    return axios
      .put(`${helper.backEndBaseUrl}/PharmacyAdmin/profile/${id}`, items)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default adminHelper;

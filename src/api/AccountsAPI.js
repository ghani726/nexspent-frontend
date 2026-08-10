import axios from "axios";

import config from "../config/config.js";

// Add Account API
export const AddAccount = async ({
  name,
  balance = 0,
  decimalPrecision = null,
  bgColor = "Default",
  currency = null,
  token,
}) => {
    console.log(balance);
    
  const res = await axios.post(
    `${config.BackendURL}/user/accounts/`,
    {
      name: name,
      balance: balance,
      decimalPrecision: decimalPrecision,
      bgColor:bgColor,
      currency: currency,
      token: token,
    },
    {
      withCredentials: true, // <--- THIS IS REQUIRED
    },
  );
  return res.data;
};
export const EditAccount = async ({
  name,
  decimalPrecision = null,
  bgColor = "Default",
  currency = null,
  accountID,
  token,
}) => {
    
  const res = await axios.patch(
    `${config.BackendURL}/user/accounts/`,
    {
      name: name,
      decimalPrecision: decimalPrecision,
      bgColor:bgColor,
      currency: currency,
      accountID: accountID,
      token: token,
    },
    {
      withCredentials: true, // <--- THIS IS REQUIRED
    },
  );
  return res.data;
};

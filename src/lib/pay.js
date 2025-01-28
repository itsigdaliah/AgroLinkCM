import axios from "axios";

const baseUrl = "https://live.fapshi.com";
const headers = {
  apiuser:"6f38694a-d6e8-4758-93a7-4205a302871c00",
  apikey:  "FAK_8e3379c597c3e0ec5167b59325c6dfaddd"
};

const payment = {
  initiatePay(data = {amount}) {
    return new Promise(async (resolve) => {
      try {
        if (!data?.amount) resolve(error("amount required", 500));
        if (!Number.isInteger(data.amount))
          resolve(error("amount must be of type integer", 500));
        if (data.amount < 500)
          resolve(error("amount cannot be less than 500 XAF", 500));

        const config = {
          method: "post",
          url: `${baseUrl}/initiate-pay`,
          headers: headers,
          data: data,
        };
        const response = await axios(config);
        response.data.statusCode = response.status;
        resolve(response.data);
      } catch (e) {
        e.response.data.statusCode = e?.response?.status;
        resolve(e.response.data);
        console.log(e);
      }
    });
  },

  paymentStatus(transId) {
    return new Promise(async (resolve) => {
      try {
        if (!transId || typeof transId !== "string")
          resolve(error("invalid type, string expected", 5000));
        if (!/^[a-zA-Z0-9]{8,9}$/.test(transId))
          resolve(error("invalid transaction id", 400));

        const config = {
          method: "get",
          url: `${baseUrl}/payment-status/${transId}`,
          headers: headers,
        };
        const response = await axios(config);
        response.data.statusCode = response.status;
        resolve(response.data);
      } catch (e) {
        e.response.data.statusCode = e?.response?.status;
        resolve(e.response.data);
      }
    });
  },

  userTrans(userId) {
    return new Promise(async (resolve) => {
      try {
        if (!userId || typeof userId !== "string")
          resolve(error("invalid type, string expected", 400));
        if (!/^[a-zA-Z0-9-_]{1,100}$/.test(userId))
          resolve(error("invalid user id", 400));

        const config = {
          method: "get",
          url: `${baseUrl}/transaction/${userId}`,
          headers: headers,
        };
        const response = await axios(config);
        resolve(response.data);
      } catch (e) {
        e.response.data.statusCode = e?.response?.status;
        resolve(e.response.data);
      }
    });
  },
};

function error(message, statusCode) {
  return { message, statusCode };
}

export default payment;
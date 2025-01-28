import axios from "axios";

const baseUrl = "https://live.fapshi.com";
const headers = {
  apiuser:"18cac346-1b5e-48d0-a5ad-ca067faedda7",
  apikey:  "FAK_9f394dc48a54ea9abb133152b789c1d7"
};

const payment = {
  initiatePay(amount) {
    return new Promise(async (resolve) => {
      try {
        if (amount < 500)
        {
          resolve(error("amount cannot be less than 500 XAF", 500));
          console.log("AMount: ", amount)
}
        const config = {
          method: "post",
          url: `${baseUrl}/initiate-pay`,
          headers: headers,
          data: {amount:amount},
        };
        const response = await axios(config);
        response.data.statusCode = response.status;
        console.log("response data here", response)
        resolve(response.data);
      } catch (e) {
        // e.response.data.statusCode = e?.response?.status;
        resolve(e.response.data);
        console.log("res er", e.response.data)
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
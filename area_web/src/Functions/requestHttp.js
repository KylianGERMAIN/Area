import axios from "axios";

async function httpRequest(url, data = {}, headerss = {}, method = "get") {
  try {
    return await axios({
      method: method,
      url: url,
      data: data,
      headers: headerss,
    });
  } catch (err) {
    console.log("in http error", err);
    throw err.response;
  }
}

export default httpRequest;

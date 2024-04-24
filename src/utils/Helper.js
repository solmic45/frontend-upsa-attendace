import Axios from 'axios';

export const axiosHandler = ({
  method,
  url,
  token,
  data,
  extra,
  cancelToken,
}) => {
  let methodType = method.toUpperCase();
  if (
    ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].includes(methodType) ||
    {}.toString.call(data) !== '[object Object]'
  ) {
    let axiosProps = { method: methodType, url, data, cancelToken };

    if (token) {
      axiosProps.headers = { Authorization: `Bearer ${token}` };
      console.log("yep::", token)
    }
    console.log("props:", axiosProps)
    if (extra) {
      axiosProps.headers = { ...axiosProps.headers, ...extra };
    }
    return Axios(axiosProps);
  } else {
    alert(`Method ${methodType} is not accepted or data is not an object`);
    console.log(`Method ${methodType} is not accepted or data is not an object`);
    throw new Error(`Invalid request`);
  }
};

export const errorHandler = (err, log = false, defaulted = false) => {
  let net_error = false;
  let server_error = false;
  let message = null;

  if (log) {
    console.log("miniErrorHandler::", err);
  }
  if (defaulted) {
    message = { error: "Ops!, an error occurred." };
    if (log) {
      console.log("errmsg:", message);
    }
    return { message, net_error, server_error };
  }

  if (!err.response) {
    message =   "Network error! check your network and try again" 
    net_error = true;
  } else {
    let data;
    try {
      server_error = true;
      data = err.response.data.results;
      if (!data) {
        data = err.response.data.error;
        if (!data) {
          data = err.response.data;
        }
      }
    } catch (error) {
      console.log("this error shouldnt show when there is internet");
      data = { message: "Network error! check your network and try again" };
      net_error = true;
    }

    message = data;
  }
  if (log) {
    console.log("errmsg:", message);
  }
  return { message, net_error, server_error };
};

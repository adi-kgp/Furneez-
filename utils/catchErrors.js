function catchErrors(error, displayError){
  let errorMsg;
  if (error.response){
    //the request was made and the server responded with status code not in 2XX range (axios)
    errorMsg = error.response.data;
    console.error("error response ", errorMsg);

    //for cloudinary image uploads
    if (error.response.data.error){
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request){
    // the request was made but no response was received
    errorMsg = error.request;
    console.error("error request ", errorMsg);
  } else {
    // something happened that triggered an error
    errorMsg = error.message;
    console.error('error message: ', errorMsg);
  }
  displayError(errorMsg);
}
export default catchErrors;

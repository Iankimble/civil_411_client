export const getNatElections = () => {
  return fetch(
    `https://www.googleapis.com/civicinfo/v2/elections?key=
          ${process.env.REACT_APP_GOOGLE_API_KEY}`
  ).then((res) => {
    if (res.status >= 400) {
      return Promise.reject("some error happend maybe 404");
      // throw new Error("data could not be returned");
    }
    return res.json();
  });
};

export const getLocalElections = (data) => {
  return fetch(
    `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${data}&electionId=2000&key=
    ${process.env.REACT_APP_GOOGLE_API_KEY}`
  ).then((res) => {
    if (res.status >= 400) {
      return Promise.reject("some error happend maybe 404");
      // throw new Error("data could not be returned");
    }
    return res.json();
  });
};

export const getUserReps = (data) => {
  return fetch(
    `https://www.googleapis.com/civicinfo/v2/representatives?address=${data}&key=
    ${process.env.REACT_APP_GOOGLE_API_KEY}`
  ).then((res) => {
    if (res.status >= 400) {
      return Promise.reject("some error happend maybe 404");
      // throw new Error("data could not be returned");
    }
    return res.json();
  });
};

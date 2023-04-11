import axios from 'axios';

export const deleteData = () => {
  return {
    type: 'DELETE_DATA',
  };
};

export const addData = () => {
  return async (dispatch, getState) => {
    getState();
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getFiles`).then((res) => {
      console.log(res);
      const result = [];
      const resultSubFile = {};
      res?.data?.folders.map((folder) => {
        result.push(folder.folderName);
        resultSubFile[folder.folderName] = [];
      });
      res?.data?.images?.map((item) => {
        resultSubFile[item.folderName].push({fileName: item.fileName, name: item.name});
      });
      dispatch({
        type: 'ADD_DATA',
        payload: resultSubFile,
      });
    });
  };
};

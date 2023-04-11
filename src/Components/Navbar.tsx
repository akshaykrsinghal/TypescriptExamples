import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import CollapseNavbars from './CollapseNavbars';
import {CircularProgress} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {addData} from 'config/action';
import parse from 'html-react-parser';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
  border: 2px solid black;
  width: 100%;
  height: 31em;
  background-color: white;
`;

const drawerWidth = 240;

export default function Navbar() {
  const [Files, setFiles] = React.useState([]);
  const [SubFiles, setSubFiles] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(true);
  const [selected, setSelected] = React.useState(null);
  const [selectedCollapse, setSelectedCollapse] = React.useState(null);

  console.log(process.env);

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getFiles`).then((res) => {
      console.log(res);
      const result = [];
      const resultSubFile = {};
      res?.data?.folders.map((folder) => {
        result.push(folder.folderName);
        resultSubFile[folder.folderName] = [];
      });
      res?.data?.images?.map((item) => {
        resultSubFile[item.folderName].push({
          fileName: item.fileName,
          name: item.name,
          data: item.data,
          type: item.type,
          id: item.id,
        });
      });
      setSubFiles(resultSubFile);
      setFiles(result);
      setisLoading(false);
    });
  }, []);

  // React.useEffect(() => {
  //   console.log(selected);
  // }, [selected]);

  const dispatch = useDispatch();
  // Selects the state value from the store.
  const todo = useSelector((state) => state);
  // Dispatches action to add the data

  //@ts-ignore
  const handleAddData = () => dispatch(addData());

  const base64String = btoa(String.fromCharCode(...new Uint8Array(selected?.data?.data)));

  console.log(base64String);

  //console.log((selected?.data?.data).toString());

  //const Strings = new FileReader().readAsText(selected?.data);

  //console.log(Strings);

  //@ts-ignore
  if (todo?.data?.files === null) {
    handleAddData();
  }

  return (
    <Box sx={{display: 'flex', bgcolor: '#F2FFFF'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#F2F2E4',
          color: 'black',
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Files
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#F2FFFF',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        {isLoading ? (
          <CircularProgress style={{marginLeft: '42%'}} />
        ) : (
          <>
            <Divider />
            <List>
              {Files.map((text, index) => (
                <CollapseNavbars
                  key={index}
                  name={text}
                  childComponent={SubFiles[text]}
                  setSelected={setSelected}
                  selectedCollapse={selectedCollapse}
                  setSelectedCollapse={setSelectedCollapse}
                />
              ))}
            </List>
            <Divider />
          </>
        )}
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, bgcolor: '#F2F2F2', p: 3, minHeight: '39em'}}>
        <Toolbar />
        <Wrapper>
          <h1>{selected?.fileName}</h1>
          {selected !== null && selected?.type === 'text/plain' && (
            <>
              <p>{selected?.data}</p>
            </>
          )}
          {selected !== null && selected?.type === 'text/html' && <>{parse(selected.data)}</>}
          {selected !== null && selected?.type !== 'text/html' && selected?.type !== 'text/plain' && (
            <img src={`data:image/png;base64,${base64String}`} alt="" style={{width: '100%', height: '23em'}} />
          )}
        </Wrapper>
      </Box>
    </Box>
  );
}

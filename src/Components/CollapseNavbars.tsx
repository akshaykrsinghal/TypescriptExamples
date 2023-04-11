import React from 'react';
import {ExpandLess, ExpandMore, FileOpenOutlined, FolderOutlined} from '@mui/icons-material';
import {Collapse, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import axios from 'axios';
import ConfirmDialogBox from './ConfirmDialogBox';
import FormDialogBox from './FormDialogBox';

function CollapseNavbars({
  name,
  childComponent,
  setSelected,
  selectedCollapse,
  setSelectedCollapse,
}: {
  name: String;
  childComponent: any[];
  setSelected: any;
  selectedCollapse: any;
  setSelectedCollapse: any;
}) {
  const [openCollapse, setOpenCollapse] = React.useState(false);

  function handleOpenSettings() {
    setSelectedCollapse(name);
    setOpenCollapse(!openCollapse);
  }

  React.useEffect(() => {
    if (selectedCollapse !== name) {
      setOpenCollapse(false);
    }
  }, [selectedCollapse]);

  const deleteFile = (id) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/deleteImage`, {
        id: id,
      })
      .then((data) => {
        window.location.reload();
        console.log(data);
      });
  };

  return (
    <>
      <ListItem button onClick={handleOpenSettings}>
        <ListItemIcon>
          <FolderOutlined />
        </ListItemIcon>
        <ListItemText primary={name} />
        {openCollapse ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        {childComponent.map((childComponents, index) => {
          return (
            <List component="div" disablePadding key={index}>
              <ListItem button>
                <ListItemIcon>
                  <FileOpenOutlined />
                </ListItemIcon>
                <p onClick={() => setSelected(childComponents)}>{childComponents.fileName}</p>
                <div style={{display: 'flex', gap: '7px', marginLeft: 'auto', marginRight: '0px'}}>
                  <FormDialogBox />
                  <ConfirmDialogBox deleteFile={deleteFile} />
                </div>
              </ListItem>
            </List>
          );
        })}
      </Collapse>
    </>
  );
}

export default CollapseNavbars;

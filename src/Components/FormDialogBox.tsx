import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {ModeEdit} from '@mui/icons-material';

export default function FormDialogBox() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ModeEdit style={{marginTop: '5px'}} onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <form
            className="mt-4"
            action={`${process.env.REACT_APP_BACKEND_URL}/Updateupload`}
            method="POST"
            encType="multipart/form-data"
          >
            <div className="form-group">
              <input type="file" name="file" id="input-files" className="form-control-file border" />
              <input placeholder="id" type="text" name="id" id="input-id" style={{marginTop: '5px', width: '100%'}} />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Button onClick={handleClose}>Cancel</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import React, { useState } from "react";

import Box from "@mui/material/Box";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./task.module.css";
import Tooltip from "@mui/material/Tooltip";

export function Task() {
  const [todoname, settodoname] = useState(null);
  const [tododesc, settododesc] = useState(null);
  const [todos, settodos] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [taskid, setid] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(todoname);
    console.log(tododesc);
    setid(taskid + 1);
    // eslint-disable-next-line
    if (todoname.length != 0 || tododesc != 0) {
      var obj = {
        id: taskid,
        taskname: todoname,
        taskdesc: tododesc,
      };

      settodos((current) => [...current, obj]);

      console.log(todos);
    }
  };

  const shiftItemUp = (i) => () => {
    if (i !== 0) {
      var newtodos = [...todos];
      var temp = newtodos[i];
      newtodos[i] = newtodos[i - 1];
      newtodos[i - 1] = temp;
      console.log(todos);

      settodos(newtodos);
    }
    console.log("Trying to shift " + i);
  };

  const removeItem = (i) => () => {
    var newtodos = [...todos];
    newtodos.splice(i, 1);
    settodos(newtodos);
    console.log(newtodos);
  };

  return (
    <div>
      <h2>Todo-app</h2>
      <div className={styles.row}>
        <Box
          sx={{
            width: 600,
            height: 400,
            backgroundColor: "white",
          }}
        >
          <List
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              "& ul": { padding: 0 },
            }}
          >
            {todos.map((item, index) => {
              return (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <Tooltip title="Resolve/Remove">
                      <IconButton
                        edge="end"
                        aria-label="comments"
                        onClick={removeItem(index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  }
                  disablePadding
                >
                  <ListItemButton dense>
                    <ListItemIcon>
                      <Tooltip title="Prioritise task">
                        <ArrowUpwardIcon onClick={shiftItemUp(index)} />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemIcon>
                      <Tooltip title="Update Todo">
                        <RestorePageIcon />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary={`${item.taskname}`}
                      secondary={`${item.taskdesc}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New-todo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task"
              type="name"
              fullWidth
              variant="standard"
              onChange={(e) => {
                settodoname(e.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              type="description"
              fullWidth
              variant="standard"
              onChange={(e) => {
                settododesc(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Add </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={styles.row}>
        <button className={styles.button} onClick={handleClickOpen}>
          New Todo
        </button>
      </div>
    </div>
  );
}

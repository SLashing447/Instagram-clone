import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { db, storage, firebase } from "../firebase";
import { Form, Logo, LogOut, NavWraper } from "./componets";

const Input = styled("input")({
  display: "none",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  height: "fit-content",
  width: "30rem",
};

function Nav(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [caption, setCaption] = useState("");
  const [photoBody, setPhotoBody] = useState(null);
  const [captionError, setCaptionError] = useState(false);
  const { username, photoURL, email } = props.userData;
  const [openProfile, setOpenProfile] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isOpen, setOpen] = useState(false);
  const Posts = db.collection("Posts");
  const AddPost = () => {
    const uploadTask = storage.ref(`images/${photoBody.name}`).put(photoBody);
    if (caption && photoBody) {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          props.setProgress(`Uploading Photo : ${progress}%`);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          storage
            .ref("images")
            .child(photoBody.name)
            .getDownloadURL()
            .then((url) => {
              props.setProgress(`Uploading Post`);
              Posts.add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                photoURL: url,
                DP: photoURL,
                caption: caption,
                username: username,
                Likers: [],
                comments: [],
              });
              setCaption("");
              setPhotoBody(null);
              props.setProgress("");
              setOpen(false);
            });
        }
      );
    } else {
      if (!caption) {
        setCaptionError(true);
      }
    }
  };

  return (
    <NavWraper>
      <Logo>
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />
      </Logo>
      <LogOut>
        {!props.not && (
          <>
            <Button
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="contained"
              style={{ marginRight: "1rem" }}
            >
              Dashboard
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => setOpenProfile(true)}>
                My account
              </MenuItem>
              <MenuItem onClick={() => setOpen(true)}>➕ Add Post</MenuItem>
            </Menu>
          </>
        )}

        <Modal
          open={isOpen}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Create a Post
            </Typography>
            <Form>
              <div style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.2rem" }}>
                  1) Upload a photo {">"}
                </span>
                <label htmlFor="icon-button-file">
                  <Input
                    onChange={(e) => {
                      setPhotoBody(e.target.files[0]);
                    }}
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                  />
                  <Button
                    sx={{ marginLeft: "0.8rem" }}
                    variant="contained"
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
                {photoBody && (
                  <span
                    style={{
                      padding: "0.4rem",
                    }}
                  >
                    {photoBody.name} ✅
                  </span>
                )}
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.2rem" }}>2) Write a caption </span>
                <br />
                <TextField
                  sx={{ m: 2 }}
                  required
                  error={captionError}
                  id="outlined-required"
                  label="Required"
                  placeholder="Caption"
                  onChange={(e) => {
                    captionError && setCaptionError(false);
                    setCaption(e.target.value);
                  }}
                  value={caption}
                />
              </div>
              <Button
                onClick={AddPost}
                sx={{ width: "100%" }}
                variant="outlined"
              >
                Add Post
              </Button>
            </Form>
          </Box>
        </Modal>

        <Modal
          open={openProfile}
          onClose={() => setOpenProfile(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flexCenter">
              <img
                style={{ borderRadius: "50%", border: "2px solid" }}
                src={photoURL}
              />
            </div>
            <Typography
              sx={{ textAlign: "center", marginTop: 2 }}
              id="modal-modal-title"
              variant="h3"
              component="h2"
            >
              {username}
            </Typography>
            <Typography
              sx={{ m: 2, textAlign: "center" }}
              id="modal-modal-title"
              variant="h5"
              component="h5"
            >
              {email}
            </Typography>
            <div className="flexCenter">
              <Button onClick={() => props.SignIn()} variant="outlined">
                Switch Account
              </Button>
            </div>
          </Box>
        </Modal>
        <Button
          variant="contained"
          size="medium"
          onClick={() => {
            if (props.not) {
              props.SignIn();
            } else {
              props.logOut();
            }
          }}
        >
          {props.not ? "Sign in With Google" : "Log Out"}
        </Button>
      </LogOut>
    </NavWraper>
  );
}

export default Nav;

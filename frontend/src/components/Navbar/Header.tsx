import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Search, style, StyledInputBase } from "./styled";
import { useNavigate } from "react-router-dom";

export const Header = ({ isLoggedIn }: any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [video, setVideo] = useState("");
  const [cover, setCover] = useState("");
  const [title, setTitle] = useState("");
  let navigate = useNavigate();

  const submitForm = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", video);
    formData.append("cover", cover);
    const token = localStorage.getItem("token");

    await axios.post("http://localhost:3002/api/v1/video", formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    setOpen(false);
    navigate("/video");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Streamly
          </Typography>
          {isLoggedIn && (
            <>
              <Search>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
              <div>
                <Button variant="contained" onClick={handleOpen}>
                  Add New
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      <Box
                        component="form"
                        onSubmit={submitForm}
                        noValidate
                        sx={{ mt: 1 }}
                      >
                        <label>Video Title:</label>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Select Video:</label>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="video"
                          name="video"
                          autoFocus
                          type="file"
                          onChange={(e: any) => setVideo(e.target.files[0])}
                        />
                        <label>Select Cover Image:</label>
                        <TextField
                          autoFocus
                          margin="normal"
                          required
                          fullWidth
                          name="coverImage"
                          type="file"
                          id="coverImage"
                          onChange={(e: any) => setCover(e.target.files[0])}
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Upload
                        </Button>
                      </Box>
                    </Typography>
                  </Box>
                </Modal>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

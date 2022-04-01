import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const VideoList = ({ setLoggedIn }: any) => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:3002/api/v1/video", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setVideos(data);
      } catch {
        setLoggedIn(false);
        navigate("/");
      }
    };

    fetchData();
  }, [navigate, setLoggedIn]);

  return (
    <Container>
      <Grid container spacing={2} marginTop={2}>
        {videos.map(({ _id, title, uploadDate, coverImage }) => {
          return (
            <Grid item xs={12} md={4} key={_id}>
              <Link
                to={`/video/${_id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <CardActionArea>
                  <Card sx={{ display: "flex" }}>
                    <CardContent sx={{ flex: 1 }}>
                      <Typography component="h2" variant="h5">
                        {title}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {uploadDate}
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                      image={`http://127.0.0.1:3002/${coverImage}`}
                      alt="alt"
                    />
                  </Card>
                </CardActionArea>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

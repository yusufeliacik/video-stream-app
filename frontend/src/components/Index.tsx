import { SignIn } from "./Auth/SignIn";
import { SignUp } from "./Auth/SignUp";
import { Header } from "./Navbar/Header";
import { VideoList } from "./Video/VideoList";
import { Video } from "./Video/Video";
import { Routes, Route } from "react-router-dom";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  isLoggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const Home: FC<Props> = ({ isLoggedIn, setLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />

      {isLoggedIn ? (
        <Routes>
          <Route
            path="/video"
            element={<VideoList setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/video/:id"
            element={<Video setLoggedIn={setLoggedIn} />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<SignIn setIsLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </>
  );
};

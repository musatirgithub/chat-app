import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Main = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <h1 className="form-title display-4 ">{`Welcome ${currentUser.displayName}`}</h1>
      <h1 className="form-title display-6 ">{`Hope you like the picture!`}</h1>
      <div className="text-center d-none d-md-block">
        <img src={"https://picsum.photos/800/800"} alt="sample-movie" />
      </div>
    </div>
  );
};

export default Main;

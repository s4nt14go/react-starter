import React from "react";
import {useAuth0} from "@auth0/auth0-react";

type Props = {
  style: object
}

const Home: React.FC<Props> = ({ style }) => {

  const { user } = useAuth0();
  console.log(user);

  return <div style={style}>
    <h2>Home</h2>
  </div>;
};
export default Home;

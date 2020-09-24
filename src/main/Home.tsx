import React from "react";

type Props = {
  style: object
}

const Home: React.FC<Props> = ({ style }) => {
  return <div style={style}>
    <h2>Home</h2>
  </div>;
};
export default Home;

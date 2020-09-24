import React from 'react';
import _Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import background from "../assets/background.png";
import { useHistory } from 'react-router-dom';
import styled from'styled-components';

const Typography = styled(_Typography)`
  margin-bottom: 12px !important;
  font-family: 'Bangers', cursive !important;
`;

const Div = styled.div`
  background: url(${background}) center center / cover;
  color: white;
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
`;

const lsKey = 'animateIndex';
const effects = ['bounceInDown', 'flip', 'bounceInLeft',  'rotateIn', 'zoomInDown'];

const Landing: React.FC<{}> = () => {

  let history = useHistory();

  const handleConvert = () => {
    history.push('/home');
  };

  const index = Number(localStorage.getItem(lsKey));
  localStorage.setItem(lsKey, String((index + 1) % effects.length));

  return <Div>
    <div style={{width: '100%'}}>
      <Typography variant="h4" className={`animate__animated animate__${effects[index]}`}>
        Let's get started
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleConvert}>Go in</Button>
    </div>
  </Div>
};

export default Landing;

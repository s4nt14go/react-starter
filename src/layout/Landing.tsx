import React, {useEffect, useState} from 'react';
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
  overflow: hidden;
`;

const lsKey = 'animateIndex';
const effects = ['bounceInDown', 'flip', 'bounceInLeft',  'rotateIn', 'zoomInDown'];

export const initialPath = 'home';  // This path is used when we click on "GO IN" and also when we logout/login, so it should be configured in Auth0 as Allowed Callback and Logout URLs

const Landing: React.FC<{}> = () => {

  let history = useHistory();


  const handleGoIn = () => {
    history.push(`/${initialPath}`);
  };

  const [ index, setIndex ] = useState();
  useEffect(() => {
    const lsIndex = Number(localStorage.getItem(lsKey));
    localStorage.setItem(lsKey, String((lsIndex + 1) % effects.length));
    setIndex(lsIndex);
  }, []);

  return <Div>
    <div style={{width: '100%'}}>

      {typeof index === 'number'?
        <Typography variant="h4" className={`animate__animated animate__${effects[index]}`}>
          Let's get started
        </Typography>
        : <Typography variant="h4">&nbsp;</Typography>}

        <Button variant="contained" color="secondary" onClick={handleGoIn}>Go in</Button>

    </div>
  </Div>
};

export default Landing;

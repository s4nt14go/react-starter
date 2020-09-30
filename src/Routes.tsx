import React, {ReactElement} from 'react';
import Demo from './main/Demo/App';
import Home from './main/Home';
import {
  Switch,
  Route,
} from "react-router-dom";
import {
  FaReact,
  ImHome3,
  GrTextAlignLeft, FaUser, AiFillApi,
} from "react-icons/all";
import Paragraphs from "./main/Paragraphs";
import Landing from "./layout/Landing";
import Site from "./layout/Site";
import PrivateRoute from "./component/PrivateRoute";
import {useAuth0} from "@auth0/auth0-react";
import Loading from "./component/Loading";
import Profile from "./main/Profile";
import Api from "./main/Api";

export type Section = {
  to: string
  text: string
  icon: ReactElement
  component: React.FC
  private?: boolean
  menu: boolean
}

export const sections: Section[] = [
  {
    to: '/home',
    text: 'Home',
    icon: <ImHome3 />,
    component: Home,
    menu: true,
  },
  {
    to: '/paragraphs',
    text: 'Paragraphs',
    icon: <GrTextAlignLeft />,
    component: Paragraphs,
    menu: true,
  },
  {
    to: '/demo',
    text: 'Demo',
    icon: <FaReact />,
    component: Demo,
    menu: true,
    private: true,
  },
  {
    to: '/profile',
    text: 'Profile',
    icon: <FaUser />,
    component: Profile,
    menu: false,    // Accessible clicking on user avatar in top bar
    private: true,
  },
  {
    to: '/api',
    text: 'API',
    icon: <AiFillApi />,
    component: Api,
    menu: true,
    private: true,
  },
];
export const defaultSection = sections[0];
const Routes: React.FC<{}> = () => {

  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />;

  return (<>

      <Switch>
        <Route path="/" exact>
          <Landing/>
        </Route>

        <Route>
          <Site sections={sections}>
            <Switch>

              {sections.map((section, _index) => {
                if (!section.private) return <Route path={section.to} key={section.text} component={section.component} />;
                return <PrivateRoute component={section.component} path={section.to} key={section.text} />;
              })}

              <Route path='/' key={defaultSection.text} component={defaultSection.component} />;

            </Switch>
          </Site>
        </Route>
      </Switch>

  </>);
};

export default Routes;

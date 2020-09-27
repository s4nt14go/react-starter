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
  GrTextAlignLeft,
} from "react-icons/all";
import Paragraphs from "./main/Paragraphs";
import Landing from "./layout/Landing";
import Site from "./layout/Site";
import PrivateRoute from "./component/PrivateRoute";
import {useAuth0} from "@auth0/auth0-react";
import Loading from "./component/Loading";

export type Section = {
  to: string
  text: string
  icon: ReactElement
  component: React.FC
  private?: boolean
}

const allSections: Section[] = [
  {
    to: '/home',
    text: 'Home',
    icon: <ImHome3 />,
    component: Home,
  },
  {
    to: '/paragraphs',
    text: 'Paragraphs',
    icon: <GrTextAlignLeft />,
    component: Paragraphs,
  },
  {
    to: '/demo',
    text: 'Demo',
    icon: <FaReact />,
    component: Demo,
    private: true,
  },
];
export let sections: Section[];
export let defaultSection: Section;
const Routes: React.FC<{}> = () => {

  const { isAuthenticated, isLoading } = useAuth0();

  sections = allSections.filter(s => {
    if (!s.private) return true;
    return isAuthenticated;
  });
  defaultSection = sections[0];

  return (<>

    {isLoading && <Loading />}

      <Switch>
        <Route path="/" exact>
          <Landing/>
        </Route>
        <Route>
          <Site sections={sections}>
            <Switch>

              {sections.map((section, _index) => {
                if (!section.private) return <Route path={section.to} key={section.text} component={section.component} />;
                if (isAuthenticated) return <PrivateRoute component={section.component} path={section.to} key={section.text} />;
                return null;
              })}

              <Route path='/' key={defaultSection.text} component={defaultSection.component} />;

            </Switch>
          </Site>
        </Route>
      </Switch>

  </>);
};

export default Routes;

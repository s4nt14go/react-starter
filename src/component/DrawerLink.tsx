import React, {ReactElement} from "react";
import {lighten, ListItem as _ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Link as _Link, useLocation} from "react-router-dom";
import styled, {css} from "styled-components";
import {useTheme} from "@material-ui/core/styles";
import {sections, defaultSection} from "../App";

const Link = styled(_Link)`
  color: inherit;
  text-decoration: none;
`;

type Props = {
  text: string
  to: string
  icon: ReactElement
}

const DrawerLink: React.FC<Props> = ({text, to, icon}) => {

  const theme = useTheme();
  const { pathname } = useLocation();

  let to2 = [to, to + '/']; // We should include '/<path>' and '/<path>/'

  const pathsAvailable = sections.map(s => s.to);
  let pathsAvailable2: any[] = [];
  pathsAvailable.forEach(p => pathsAvailable2 = pathsAvailable2.concat([p, p + '/']));

  const ListItem = styled(_ListItem)`
    ${(to2.includes(pathname) || (!pathsAvailable2.includes(pathname) && to === defaultSection.to)) && css`
      background: ${lighten(theme.palette.secondary.light, 0.3)} !important;
    `}
  `;

  return <Link to={to}>
    <ListItem button>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  </Link>;
};
export default DrawerLink;

import React, {ReactElement} from "react";
import {ListItem as _ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Link as _Link, useLocation} from "react-router-dom";
import styled, {css} from "styled-components";
import {useTheme} from "@material-ui/core/styles";
import {defaultSection} from "../App";

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

  const ListItem = styled(_ListItem)`
    ${(pathname === to || ('/' === pathname && to === defaultSection.to)) && css`
      background: ${theme.palette.secondary.main} !important;
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

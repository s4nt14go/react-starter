import React, {ReactElement} from "react";
import {lighten, ListItem as _ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Link as _Link, useLocation} from "react-router-dom";
import styled, {css} from "styled-components";
import {useTheme} from "@material-ui/core/styles";
import {sections, defaultSection} from "../Routes";

const Link = styled(_Link)`
  color: inherit;
  text-decoration: none;
  
  svg {
    font-size: x-large;
  }
`;

type Props = {
  text: string
  to: string
  icon: ReactElement
}

const DrawerLink: React.FC<Props> = ({text, to, icon}) => {

  let highlight = false;
  // console.log('to', to);
  const theme = useTheme();
  const { pathname } = useLocation();
  // console.log('pathname', pathname);

  const pathsAvailable = sections.map(s => s.to);
  let forRegExp: string[] = [];
  pathsAvailable.forEach(p => {
    // eslint-disable-next-line no-useless-escape
    forRegExp = forRegExp.concat([`\\${p}\/`]);
  });

  // console.log('forRegExp', forRegExp);
  let joined = forRegExp.join('|');
  // console.log('joined', joined);

  if (pathname === to || pathname.startsWith(`${to}/`)) {
    highlight = true;
  } else if (to === defaultSection.to) {  // If the pathname isn't available, it will default to the default route so we have to highlight its link
    const re = new RegExp(`^(${joined})`);
    const match = pathname.match(re);
    // console.log('match', match);
    if (!pathsAvailable.includes(pathname) && !match) {
      highlight = true;
    }
  }

  const ListItem = styled(_ListItem)`
    ${highlight && css`
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

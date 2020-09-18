import {IconType} from "react-icons";
import styled from "styled-components";

export function log(obj: any) {
  const variableName = Object.keys(obj)[0];
  console.log(variableName, obj[variableName]);
}

export function setIconXL(e:IconType):IconType {
  return styled(e)`
  font-size: x-large; 
  `
}

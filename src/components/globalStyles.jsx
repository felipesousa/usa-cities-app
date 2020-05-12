import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    transition: all 0.2s linear;
  }
`

export const light = {
  background: '#FFF',
  color: '#363537',
  primary: '#176EDA',
  white: '#FFFFFF',
  transparent: 'transparent',
}

export const dark = {
  background: '#363537',
  color: '#FFFFFF',
  primary: '#176EDA',
  white: '#FFFFFF',
  transparent: 'transparent',
}
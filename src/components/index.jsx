import styled from 'styled-components';
import Background from '../assets/city.jpg';
import colors from '../config/colors';

export const Main = styled.main`
  width: 100%;
  padding: 0px 20px 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${colors.transparent};
  position: absolute;
  top: ${props => !!props.loading ? '160px' : 0};
  transition: all 0.5s linear 0s;
`;

export const Input = styled.input`
  width: 250px;
  height: auto;
  box-sizing: border-box;
  padding: 10px 10px 5px;
  outline: none;
  border: none;
  margin-bottom: 30px;
  background: ${colors.transparent};
  border-bottom: 2px solid ${colors.secondary};
  font-size: 1.5rem;
  font-family: Nunito;
  color: ${colors.secondary};
  text-align: center;

  &::placeholder {
    color: ${colors.secondary};
  }

  &::focus {
    border-bottom: 2px solid red !important;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 900;
  font-size: 4rem;
  color: ${colors.primary};
  margin-bottom: 0px;
`;

export const SubTitle = styled.h2`
  margin-bottom: 0px;
  max-width: 700px;
  font-weight: 400;

  a {
    text-decoration: none;
    color: ${colors.secondary};
    font-style: italic;
    border: none;
    border-bottom: 4px solid ${colors.primary};
  }
`;

export const Divider = styled.div`
  width: 100px;
  height: 5px;
  background: ${colors.secondary};
  margin: 40px 0px;
`;

export const Cities = styled.section`
  width: 100%;
  max-width: 1000px;
  height: auto;
  padding: 10px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const City = styled.article`
  width: 180px;
  height: 180px;
  margin: 10px;
  border-radius: 12px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 8px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  background-image: url(${Background});
  background-size: cover;
  
  &:before {
    content: '';
    width: 180px;
    height: 180px;
    background: rgba(0,0,0,0.5);
    border-radius: 12px;
    position: absolute;
  }
`;

export const CityName = styled.h1`
  text-align: center;
  color: ${colors.white};
  z-index: 2;
  margin: 0;
`;

export const StateName = styled.h4`
  text-transform: uppercase;
  color: ${colors.white};
  z-index: 2;
  margin: 0;
`;

export const Line = styled.div`
  color: ${colors.white};
  z-index: 2;
  display: flex;
  justify-content: center;
  flex-direction: row;

  &:before {
    content: '';
    width: 45px;
    height: 2px;
    background: ${colors.white};
    position: absolute;
  }
`;
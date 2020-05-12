import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { debounceTime, mergeMap, map } from 'rxjs/operators';

import {
  Main,
  Title,
  SubTitle,
  Button,
  Divider,
  Line,
  Input,
  City,
  CityName,
  StateName,
  Cities
} from './components';

import { GlobalStyles, dark, light  } from './components/globalStyles';

import parseUrl from './config';

const Subject$ = new Subject();

const App = () => {
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  useEffect(() => {
    Subject$
      .pipe(
        map(data => { setLoading(true); return data;}),
        debounceTime(500),
        map(parseUrl),
        mergeMap(ajax.getJSON),
        map(data => { setLoading(false); return data;}),
      )
      .subscribe(setData);

      return (() => { Subject$.unsubscribe(); });
  }, []);

  const getInputValues = () => ({
    city: cityRef.current.value,
    state: stateRef.current.value,
  });
 
  const renderCity = ({ city, state }, i) => (
    <City key={i}>
      <CityName>{city}</CityName>
      <Line>⇼</Line>
      <StateName>{state}</StateName>
    </City>
  );

  const onChange = e => Subject$.next(getInputValues());

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <>
      <GlobalStyles/>
      <Main loading={loading.toString() && !data.length}>
        <Title>USA Cities</Title>
        <SubTitle>Search for all USA's cities. You can use the state or city name to find. The experiment created to apply the <a rel="noopener noreferrer" href="https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086" target="_blank">debounce</a> delay pattern.</SubTitle>
        <Button onClick={themeToggler}>Switch Theme</Button>

        <Divider />

        <Input
          type="text"
          ref={cityRef}
          placeholder="City, e.g: New York"
          id="city"
          onChange={onChange}
        />

        <Input
          type="text"
          ref={stateRef}
          placeholder="State, e.g: Texas"
          id="state"
          onChange={onChange}
        />

        <Cities>{ data && data.map(renderCity) }</Cities>
      </Main>
    </>
  </ThemeProvider>
  )
}

export default App;

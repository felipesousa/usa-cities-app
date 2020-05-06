import React, { useState, useEffect, useRef } from 'react';
import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { debounceTime, mergeMap, map } from 'rxjs/operators';

import parseUrl from './config';

import './app.css';

const Subject$ = new Subject();

const App = () => {
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    Subject$
      .pipe(
        debounceTime(1500),
        map(parseUrl),
        mergeMap(ajax.getJSON)
      )
      .subscribe(setData);

      return (() => { Subject$.unsubscribe(); });
  }, []);

  const getInputValues = () => ({
    city: cityRef.current.value,
    state: stateRef.current.value,
  });

  const onChange = e => Subject$.next(getInputValues());

  return <>
    <input type="text" ref={cityRef} placeholder="city " id="city" onChange={onChange} />
    <input type="text" ref={stateRef} placeholder="state " id="state" onChange={onChange} />
    <ul>
      { data && data.map(({ city, state }, i) => <li key={i}>{city} - {state}</li>) }
    </ul>
  </>;
}

export default App;

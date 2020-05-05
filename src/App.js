import React, { useState, useEffect, useRef } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const Subject$ = new Subject();

const App = () => {
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    Subject$
      .pipe(debounceTime(2000))
      .subscribe(fetchData);
  });

  const getInputValues = () => ({
    city: cityRef.current.value,
    state: stateRef.current.value,
  });

  const onChange = (e) => {
    Subject$.next(getInputValues());
  }

  const fetchData = async ({ city, state }) => {
    try {
      const response = await fetch(`https://usa-cities-api.herokuapp.com/cities?city=${city}&state=${state}`);
      const data = await response.json();

      setData(data);
    } catch (e) {
      console.error(e.toString());
    }
  }

  return <>
    <input type="text" ref={cityRef} placeholder="city name here" id="city" onChange={onChange} />
    <input type="text" ref={stateRef} placeholder="state name here" id="state" onChange={onChange} />
    <ul>
      { data && data.map(({ city, state }, i) => <li key={i}>{city} - {state}</li>) }
    </ul>
  </>;
}

export default App;

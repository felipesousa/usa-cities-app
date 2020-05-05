import React, { useState, useEffect } from 'react';
import { Subject, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const city$ = new Subject();
const state$ = new Subject();

const App = () => {
  const [value] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    merge(city$, state$)
      .pipe(debounceTime(5000))
      .subscribe(fetchData);
  }, [value])

  const onCity = (e) => {
    city$.next({ city: e.target.value });
  }

  const onState = (e) => {
    state$.next({ state: e.target.value });
  }

  const fetchData = async ({ city = '', state = '' }) => {
    try {
      const response = await fetch(`https://usa-cities-api.herokuapp.com/cities?city=${city}&state=${state}`);
      const data = await response.json();

      setData(data);
    } catch (e) {
      console.error(e.toString());
    }
  }

  return <>
    <input type="text" placeholder="city name here" id="city" onChange={onCity} />
    <input type="text" placeholder="state name here" id="state" onChange={onState} />
    <p>{value}</p>
    <ul>
      { data && data.map(({ city, state }) => <li>{city} - {state}</li>) }
    </ul>
  </>;
}

export default App;

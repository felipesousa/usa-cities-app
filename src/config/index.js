const API_BASE = 'https://usa-cities-api.herokuapp.com/cities';

const parseUrl = ({ city, state }) => `${API_BASE}?city=${city}&state=${state}`;

export default parseUrl;

import React from 'react';
import ChampionsList from './pages/ChampionsList';
import Header from './components/Header';
import {createGlobalStyle} from 'styled-components';

const MyGlobalStyle = createGlobalStyle`
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgb(0, 0, 0, .1);
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`

function App() {
  return (
    <>
      <MyGlobalStyle />
      <Header headerHeight={100}></Header>
      <ChampionsList />
    </>
  );
}

export default App;

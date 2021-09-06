import { h, render, Component } from 'preact';
import Hello from './components/Hello';

// Import global styles
import './index.css';

class App extends Component {
  render() {
    return (
      <Hello text="Hello world!" />
    );
  }
}

render(<App />, document.querySelector('#root')!);

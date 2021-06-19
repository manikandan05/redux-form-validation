import './App.css';
import Navigation from './pages/Navigation';
import 'react-widgets/styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Container() {
  return (
    <div className='sample-container'>
      <div className='header'>
        <h1>Redux Form Samples</h1>
      </div>
      <div className='content-area'>
        <Navigation></Navigation>
      </div>
    </div>
  );
}

export default Container;

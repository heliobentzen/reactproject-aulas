import './App.css';
import ProductList from './components/ProductList';

function App() {



  function Button({ label, onClick }) {
    return <button onClick={onClick}>{label}</button>;
  }

  <ProductList />


}

export default App
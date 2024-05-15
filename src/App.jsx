import TopUrls from './pages/topUrls';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Header/>
      </header>
      <section>
        <TopUrls/>
      </section>
    </div>
  );
}

export default App;

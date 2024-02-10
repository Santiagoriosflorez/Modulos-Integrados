import AppRouter from './routers/AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layouts/Layout';

function App() {
  return (
      <Router>
            <Layout>
                <AppRouter/>
              </Layout>
      </Router>
  );
}

export default App;

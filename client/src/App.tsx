import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <div className="container">
                <Switch>
                    <Route path="/" component={Home} exact />
                    {/* Додайте інші маршрути тут */}
                </Switch>
            </div>
        </Router>
    );
};

export default App;

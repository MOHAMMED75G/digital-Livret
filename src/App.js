import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Common/Navbar/Navbar';
import Footer from './Common/footer/Footer';
import Home from './Components/pages/Home';
import About from './Components/About/About';
import SinglePage from './SinglePage/SinglePage';
import Blog from './Components/Blog/Blog';
import BlogSingle from './Components/Blog/blog-single-page/BlogSingle';
import Contact from './Components/Contact/Contact';
import Login from './Components/login/Login';
import Register from './Components/login/Register';
import Profile from './Components/login/Profile';
import Profilesave from './Components/login/profile-save';
import CreateLivret from './Components/login/new-livret';
import LivretsPage from './Components/login/livretpage';
import livret from './Components/login/Home';
import singleyourpage from './SinglePage/singleyourpage';
import Livretpage from './Components/livret/livret-page';
function App() {
  

  
  return (
    <Router>
      <Switch>
      <Route path="/profile/:email" component={Profile} />
        <Route path="/profile-save/:email" component={Profilesave} />
        <Route path="/new-livret" component={CreateLivret} />
        <Route path="/livrets" component={LivretsPage} />
      <Route path="/your-livret/:livretId" component={livret} />
      <Route path="/here-livret/:livretId" component={Livretpage} />
      <Route path="/herelivret/:id/:livretId" component={singleyourpage} />
      <Route>
          <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/livret/:id/:livretId" component={SinglePage} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/blogsingle/:id" component={BlogSingle} />
        <Route path="/contact" component={Contact} />
        <Route path="/Register" component={Register} />
        <Route path="/sign-in" component={Login} />
       
        
      </Switch>
      <Footer />
      </Route>
      </Switch>
       
    </Router>

  );
}

export default App;

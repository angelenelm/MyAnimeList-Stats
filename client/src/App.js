import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { accessToken, logout, getCurrentUserProfile } from "./myanimelist";
import { catchErrors } from "./utils";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      
      console.log(data);
      
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            
            <Route exact path="/">
              {!token || !profile ? (
                <>
                  <a className="App-link" href="http://localhost:8080/login">
                    Log in to MyAnimeList
                  </a>
                </>
              ) : (
                <Redirect to="/:id" />
              )}
            </Route>

            <Route exact path="/:id">
              <button onClick={logout}> Log out</button>
              <h1>{profile?.name}</h1>
              <p>Joined at {profile?.joined_at}</p>
              <img src={profile?.picture} alt="Avatar" />
            </Route>
              
            <Route exact path="/:id/anime">
                <div>
                  <h1>All time anime stats</h1>
                </div>
            </Route>
            <Route exact path="/:id/anime/:id">
                <h1>[year] anime stats</h1>
            </Route>

            <Route exact path="/:id/manga/">
                <h1>[year] manga stats</h1>
            </Route>

            <Route exact path="/:id/manga/:id">
                <h1>[year] manga stats</h1>
            </Route>
            
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;

import styles from './styles/App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import ProfilePage from './pages/profile/ProfilePage';
import Landing from './components/Landing';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';

function App() {
  return (
    <div className={styles.App}>
      <header>
        <NavBar />
        <Container className={styles.Body}>
          <Switch>
            <Route exact path="/" render={() => <Landing />} />
            <Route exact path="/profile" render={() => <ProfilePage />} />
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
          </Switch>
        </Container>
      </header>
    </div>
  );
}

export default App;
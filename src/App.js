import styles from "./styles/App.module.css";
import NavBar from "./components/profile/NavBar";
import Container from "react-bootstrap/Container";
import "./api/axiosDefaults";
import Landing from "./pages/auth/Landing";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import CreateTaskForm from "./pages/tasks/CreateTaskForm";
import UpdateTaskForm from "./pages/tasks/UpdateTaskForm";
import UpdateProfileForm from "./pages/profile/UpdateProfileForm";
import Profile from "./pages/profile/Profile";
import Task from "./pages/tasks/Task";
import FourOFour from "./pages/FourOFour";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const Route = require("react-router-dom").Route;
  const Routes = require("react-router-dom").Routes;

  return (
    <Container className={styles.App}>
      <NavBar toast={toast}/>
      <Container className={styles.Body}>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/signin" element={<SignInForm toast={toast}/>} />
          <Route exact path="/signup" element={<SignUpForm toast={toast}/>} />
          <Route exact path="/task/create/:id" element={<CreateTaskForm toast={toast}/>} />
          <Route exact path="/task/:id" element={<Task toast={toast}/>} />
          <Route exact path="/task/:id/update" element={<UpdateTaskForm toast={toast}/>} />
          <Route
            exact
            path="/profile/:id/edit"
            element={<UpdateProfileForm />}
          />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<FourOFour />} />
          <Route path="/not_found" element={<FourOFour />} />
        </Routes>
      </Container>
      <ToastContainer
        className={styles.Toaster}
        position="top-center"
        autoClose={5000}
        hideProgressBar
      />
    </Container>
  );
}

export default App;

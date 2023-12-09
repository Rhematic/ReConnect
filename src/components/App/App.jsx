import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AdminConsoleView from "../AdminConsoleView/AdminConsoleView";
import AdminSearchView from "../AdminConsoleView/AdminSearchView/AdminSearchView";
import AdminQuestions from "../AdminConsoleView/AdminQuestions/AdminQuestions";
import AdminPrompts from "../AdminConsoleView/AdminPrompts/AdminPrompts";
import AdminResources from "../AdminConsoleView/AdminResources/AdminResources";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Survey from "../Survey/Survey";
import ResourcesView from "../ResourcesView/ResourcesView";
import CalendarView from "../CalendarView/CalendarView";
import JournalView from "../JournalView/JournalView";
import BottomNavigation from "../BottomNavigation/BottomNavigation";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <Nav />
      <Switch>
        {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
        <Redirect exact from="/" to="/home" />

        {/* Visiting localhost:3000/about will show the about page. */}
        <Route
          // shows AboutPage at all times (logged in or not)
          exact
          path="/about"
        >
          <AboutPage />
        </Route>

        {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

        <ProtectedRoute
          // logged in shows UserPage else shows LoginPage
          exact
          path="/user"
        >
          {user.id ? (
            // If the user is already logged in,
            // redirect to the /user page
            <Redirect to="/calendar" />
          ) : (
            // Otherwise, show the login page
            <CalendarView />
          )}
        </ProtectedRoute>

        <Route exact path="/login">
          {user.id ? (
            // If the user is already logged in,
            // redirect to the /user page
            <Redirect to="/calendar" />
          ) : (
            // Otherwise, show the login page
            <LoginPage />
          )}
        </Route>

        <Route exact path="/registration">
          {user.id ? (
            // If the user is already logged in,
            // redirect them to the /user page
            <Redirect to="/calendar" />
          ) : (
            // Otherwise, show the registration page
            <RegisterPage />
          )}
        </Route>

        <Route exact path="/home">
          {user.id && user.access_level === 'admin' ? (
            // If the user is already logged in,
            // redirect them to the /calendar page
            <Redirect to="/admin" />
          ) : user.id ? (
            // If the user is a guest, do something else
            <Redirect to="/calendar" />
          ) : (
            // Otherwise, show the LandingPage
            <LandingPage />
          )}
        </Route>

        <ProtectedRoute exact path="/user">
          <UserPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/info">
          <InfoPage />
        </ProtectedRoute>

        <Route exact path="/login">
          {user.id ? (
            // If the user is already logged in,
            // redirect to the /user page
            <Redirect to="/user" />
          ) : (
            // Otherwise, show the login page
            <LoginPage />
          )}
        </Route>

        <ProtectedRoute
          // logged in shows Survey page
          exact
          path="/survey"
        >
          <Survey />
        </ProtectedRoute>
        <Route exact path="/journal">
          <JournalView />
        </Route>

        <ProtectedRoute
          // logged in shows CalendarView else shows LoginPage
          exact
          path="/calendar"
        >
          {user.id && user.access_level === 'admin' ? (
            // If the user is already logged in,
            // redirect them to the /calendar page
            <Redirect to="/admin" />
          ) : user.id ? (
            // If the user is a guest, do something else
            <CalendarView />
          ) : (
            // Otherwise, show the LandingPage
            <LandingPage />
          )}
         
        </ProtectedRoute>

        <Route exact path="/resources">
          <ResourcesView />
        </Route>

        <ProtectedRoute
          // logged in shows AdminConsoleView else shows LoginPage
          exact
          path="/admin"
          authRedirect="/user"
        >
          {user.access_level === "admin" ? (
            <AdminConsoleView />
          ) : (
            <Redirect to="/user" />
          )}
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/search" authRedirect="/user">
          {user.access_level === "admin" ? (
            <AdminSearchView />
          ) : (
            <Redirect to="/user" />
          )}
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/questions" authRedirect="/user">
          {user.access_level === "admin" ? (
            <AdminQuestions />
          ) : (
            <Redirect to="/user" />
          )}
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/prompts" authRedirect="/user">
          {user.access_level === "admin" ? (
            <AdminPrompts />
          ) : (
            <Redirect to="/user" />
          )}
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/resources" authRedirect="/user">
          {user.access_level === "admin" ? (
            <AdminResources />
          ) : (
            <Redirect to="/user" />
          )}
        </ProtectedRoute>
        {/* If none of the other routes matched, we will show a 404. */}
        <Route>
          <h1>404</h1>
        </Route>
      </Switch>
      <BottomNavigation />
    </Router>
  );
}

export default App;

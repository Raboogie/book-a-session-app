import HomePage from './pages/Home.tsx';
import SessionsPage from './pages/Sessions.tsx';
import SessionPage from './pages/Session.tsx';
import Login from "./pages/Login.tsx";
import Root from "./pages/Root.tsx";
import {
    Route,
    createBrowserRouter,
    createRoutesFromChildren,
    RouterProvider
} from "react-router-dom";
import BookedSessionsContextProvider from "./lib/SessionContext.tsx";
import SignUp from "./pages/SignUp.tsx";
import AuthProvider from "./lib/UserContext.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import {CreateSession} from "./pages/CreateSession.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";


const Router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path='/' element={<Root/>}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<SignUp/>} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="sessions/:id" element={<SessionPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="createSession" element={<CreateSession />} />
            </Route>

        </Route>
    )
)

function App() {
  return (
      <>
          <AuthProvider>
          <BookedSessionsContextProvider>
                <RouterProvider router={Router} />
          </BookedSessionsContextProvider>
          </AuthProvider>
      </>
  );
}
// const Router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       { path: 'sessions', element: <SessionsPage /> },
//       { path: 'sessions/:id', element: <SessionPage /> },
//     ],
//   },
// ]);
//
// function App() {
//   return <RouterProvider router={Router} />;
// }
export default App;
import HomePage from './pages/Home.tsx';
import SessionsPage from './pages/Sessions.tsx';
import SessionPage from './pages/Session.tsx';
import Root from "./pages/Root.tsx";
import {
    Route,
    createBrowserRouter,
    createRoutesFromChildren,
    RouterProvider
} from "react-router-dom";
import BookedSessionsContextProvider from "./lib/SessionContext.tsx";


const Router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path='/' element={<Root/>}>
            <Route index element={<HomePage />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="sessions/:id" element={<SessionPage />} />
        </Route>
    )
)

function App() {
  return (
      <>
          <BookedSessionsContextProvider>
                <RouterProvider router={Router} />
          </BookedSessionsContextProvider>
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
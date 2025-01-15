import { Outlet } from 'react-router-dom';
import NavBar from "../components/NavBar.tsx";

export default function Root() {
  return (
    <>
      {/* Todo: Add Header */}
        <NavBar />
      <Outlet />
    </>
  );
}

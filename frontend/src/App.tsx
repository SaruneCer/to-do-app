import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Outlet />
          <Footer />
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;

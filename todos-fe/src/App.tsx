import { useAuth0 } from "@auth0/auth0-react";
import Todos from "./todos";
import Login from "./login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryclient = new QueryClient();

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <QueryClientProvider client={queryclient}>
      <div className="h-screen bg-[#efeef5]">
        {isAuthenticated ? <Todos /> : <Login />}
      </div>
    </QueryClientProvider>
  );
}

export default App;

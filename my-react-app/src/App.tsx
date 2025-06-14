import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import EmailSender from "./components/Email";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <EmailSender />
      </div>
    </QueryClientProvider>
  );
}

export default App;

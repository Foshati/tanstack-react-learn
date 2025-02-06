import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Post from "./components/Post";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <h1 className="text-3xl font-bold underline text-red-500">
          Hello world!
        </h1>
        <Post />
      </QueryClientProvider>
    </>
  );
}

export default App;

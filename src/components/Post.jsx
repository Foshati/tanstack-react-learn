import { useQuery } from "@tanstack/react-query";
import ky from "ky";

export default function Post() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const response = await ky
        .get("https://jsonplaceholder.typicode.com/posts/1")
        .json();
      return response;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Post</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

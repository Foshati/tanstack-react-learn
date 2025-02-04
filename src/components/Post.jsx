import { useEffect, useState } from "react";
import ky from "ky";

export default function Post() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ky
          .get("https://jsonplaceholder.typicode.com/posts/1")
          .json();
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
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

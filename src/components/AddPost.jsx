import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";

function AddPost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return ky
        .post("https://jsonplaceholder.typicode.com/posts", {
          json: newPost,
        })
        .json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = {
      title: formData.get("title"),
      body: formData.get("body"),
      userId: 1,
    };
    mutation.mutate(newPost);
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" required />
        <textarea name="body" placeholder="Body" required />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Adding..." : "Add Post"}
        </button>
      </form>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Post added successfully!</p>}
    </div>
  );
}

export default AddPost;
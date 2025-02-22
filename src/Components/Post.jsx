import React, { useEffect, useState } from "react";
import { deletePost, getposts } from "../Api/PostApi";
import Form from "./Form";

function Post() {
  const [data, setData] = useState([]);
  const [updatePostApi, setUpdatePostApi] = useState({});

  const handleGetPost = async () => {
    const response = await getposts();
    setData(response.data);
   
  };

  useEffect(() => {
    handleGetPost();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newData = data.filter((post) => {
          return post.id !== id;
        });
        setData(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePost = (curr) => {
    setUpdatePostApi(curr);
  };
  return (
    <>
      <Form
        data={data}
        setData={setData}
        updatePostApi={updatePostApi}
        setUpdatePostApi={setUpdatePostApi}
      />
      <div className="flex justify-center w-full bg-gray-700 min-h-screen">
        <div className="w-[90%] p-10">
          <ol className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.map((post) => {
              const { id, title, body } = post;
              return (
                <li
                  key={id}
                  className="p-6 bg-gray-800 border-l-4 border-white text-white rounded-lg shadow-md transition-transform transform hover:scale-105 list-decimal list-inside"
                >
                  <p className="font-bold">
                    <span className="underline">Title</span> : {title}
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="underline">Body</span> : {body}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      className="border px-4 py-2 text-white rounded bg-green-600 hover:bg-green-700 transition"
                      onClick={() => {
                        handleUpdatePost(post);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="border px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      onClick={() => {
                        handleDeletePost(id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}

export default Post;

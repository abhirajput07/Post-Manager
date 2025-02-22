import React, { useEffect, useState } from "react";
import { postData, updatePost } from "../Api/PostApi";

function Form({ data, setData, updatePostApi, setUpdatePostApi }) {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });
  useEffect(() => {
    updatePostApi &&
      setAddData({
        title: updatePostApi.title,
        body: updatePostApi.body,
      });
  }, [updatePostApi]);
  const updatePostData = async () => {
    try {
      const res = await updatePost(updatePostApi.id, addData);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((post) => {
            return post.id === updatePostApi.id ? res.data : post;
          });
        });
        setAddData({ title: "", body: "" });
        setUpdatePostApi({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isEmpty = Object.keys(updatePostApi).length === 0;

  const handleInputChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const addPostData = async () => {
    try {
      const res = await postData(addData);
      if (res.status === 201) {
      
        setData([...data, res.data]);
        setAddData({ title: "", body: "" });
      }
    } catch (error) {
      alert("enter title and body");
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex justify-center gap-2 p-5 border-l-4 border-white mx-auto rounded-xl bg-gray-800 mt-10"
    >
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          className="border text-white outline-none px-3 py-1"
          placeholder="Add Title"
          name="title"
          id="title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          className="border text-white outline-none px-3 py-1"
          placeholder="Add Body"
          name="body"
          id="boyd"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="border text-white outline-none px-3 py-1 rounded bg-green-600 hover:bg-green-700 transition"
        type="submit"
        value={isEmpty ? "Add" : "Edit"}
      >
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
}

export default Form;

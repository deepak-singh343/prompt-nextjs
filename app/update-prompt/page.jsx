"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

const EditPromptComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    if (!promptId) return;
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (error) {
        console.error("Error fetching prompt details:", error);
      }
    };
    getPromptDetails();
  }, [promptId]);

  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("PromptId not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: post.prompt, tag: post.tag }),
      });
      if (response.ok) router.push("/");
    } catch (error) {
      console.log("Error updating prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

const EditPrompt = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditPromptComponent />
  </Suspense>
);

export default EditPrompt;

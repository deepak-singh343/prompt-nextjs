import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();
  console.log({ userId, prompt, tag });
  try {
    await connectToDB();
    console.log("after connection", {
      creator: userId,
      tag: tag,
      prompt: prompt,
    });
    const newPrompt = new Prompt({ creator: userId, tag: tag, prompt: prompt });
    console.log("Before Saving:", newPrompt); // Check if tag is included
    await newPrompt.save();

    console.log("After Saving:", newPrompt); // Debug after save
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};

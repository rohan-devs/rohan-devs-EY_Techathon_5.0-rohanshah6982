"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function Page() {
  const [transcript, setTranscript] = useState(
    "Hello, this is John from QuickFix Services. I’m calling to let you know we’ve received your request about the issue with your washing machine. It seems like the motor might need replacing. Based on our records, your warranty is still valid, so the repair will be covered. I’d like to schedule a technician visit at your convenience. Could you please let me know a suitable time for the inspection? Also, it would be great if you could keep your purchase receipt handy for verification. If you have any other concerns, feel free to mention them during the visit. Thank you for reaching out, and we look forward to resolving the issue for you soon."
  );
  const [summary, setSummary] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!transcript.trim()) {
      alert("Please paste a transcript.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyD9Lk1f2YnV3YQOT0jTztpVEaClX-0lass",
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Summarize this transcript and provide the sentiment analysis: ${transcript}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 1,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
            responseMimeType: "application/json",
          },
        }
      );

      // Extract the generated text
      const generatedContent =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Assume the API response includes both summary and sentiment in the same generated text
      const [generatedSummary, generatedSentiment] =
        generatedContent.split("\n\n");

      // Update state with the extracted values
      setSummary(generatedSummary || "No summary provided.");
      setSentiment(generatedSentiment || "positive");
    } catch (error) {
      console.error("Error fetching data from Gemini API:", error);
      alert("Failed to fetch data from the API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Transcript</span>
          </div>
          <div className="p-4">
            <div className="flex flex-col items-center gap-4 p-6">
              <textarea
                className="w-full h-40 border rounded-md p-2"
                placeholder="Paste your transcript here..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Summary & Sentiment"}
              </button>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full flex-col items-center justify-center p-6">
                <span className="font-semibold">Summary</span>
                <div className="p-4">
                  <p>{summary || "Summary will appear here."}</p>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full flex-col items-center justify-center p-6">
                <span className="font-semibold">Sentiment</span>
                <div className="p-4">
                  <p>{sentiment || "Sentiment will appear here."}</p>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default Page;

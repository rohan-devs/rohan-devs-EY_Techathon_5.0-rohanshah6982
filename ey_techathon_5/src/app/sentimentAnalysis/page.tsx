"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Maximize2, Minimize2 } from "lucide-react";

function Page() {
  const [transcript, setTranscript] = useState(
    "Hello, this is John from QuickFix Services. I'm calling to let you know we've received your request about the issue with your washing machine. It seems like the motor might need replacing. Based on our records, your warranty is still valid, so the repair will be covered. I'd like to schedule a technician visit at your convenience. Could you please let me know a suitable time for the inspection? Also, it would be great if you could keep your purchase receipt handy for verification. If you have any other concerns, feel free to mention them during the visit. Thank you for reaching out, and we look forward to resolving the issue for you soon."
  );
  const [analysis, setAnalysis] = useState({
    summary: "",
    sentiment: "",
    keyPoints: [],
    confidence: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleGenerate = async () => {
    if (!transcript.trim()) {
      setError("Please paste a transcript.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD9Lk1f2YnV3YQOT0jTztpVEaClX-0lass",
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Analyze the following customer service transcript and provide:
                  1. A brief summary (2-3 sentences)
                  2. The overall sentiment (positive, negative, or neutral)
                  3. Key points from the conversation
                  4. Confidence score (0-100)
                  
                  Format the response as:
                  Summary: <summary>
                  Sentiment: <sentiment>
                  Key Points:
                  - point 1
                  - point 2
                  Confidence: <score>
                  
                  Transcript: ${transcript}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          },
        }
      );

      const generatedContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      const summaryMatch = generatedContent.match(/Summary: (.*?)(?=\n|$)/);
      const sentimentMatch = generatedContent.match(/Sentiment: (.*?)(?=\n|$)/);
      const confidenceMatch = generatedContent.match(/Confidence: (\d+)/);
      
      const keyPointsSection = generatedContent.split("Key Points:")[1]?.split("Confidence:")[0];
      const keyPoints = keyPointsSection
        ?.split("\n")
        .map(point => point.trim())
        .filter(point => point.startsWith("-"))
        .map(point => point.substring(1).trim()) || [];

      setAnalysis({
        summary: summaryMatch?.[1] || "No summary available",
        sentiment: sentimentMatch?.[1]?.toLowerCase() || "neutral",
        keyPoints: keyPoints,
        confidence: parseInt(confidenceMatch?.[1] || "0")
      });
    } catch (error) {
      console.error("Error fetching data from Gemini API:", error);
      setError("Failed to analyze the transcript. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold ">Sentiment Analysis</h1>
        <p className="">Analyze customer service transcripts for sentiment and key insights</p>
      </div>

      <div className="lg:hidden mb-4">
        <Button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          {isCollapsed ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          {isCollapsed ? "Show Analysis" : "Show Transcript"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Transcript Section */}
        <div className={`${isCollapsed ? 'hidden lg:block' : 'block'}`}>
          <Card className="h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold">Transcript</span>
              <Badge variant="outline">Input</Badge>
            </div>
            <div className="p-4 flex flex-col h-full">
              <textarea
                className="w-full flex-1 min-h-[300px] border rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste your transcript here..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              <div className="mt-4">
                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Analyzing..." : "Analyze Transcript"}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Analysis Section */}
        <div className={`${isCollapsed ? 'block' : 'hidden lg:block'}`}>
          <div className="space-y-4">
            {/* Summary Card */}
            <Card>
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold">Summary</span>
                <Badge variant="outline">AI Generated</Badge>
              </div>
              <div className="p-4">
                <p className="">{analysis.summary || "Analysis results will appear here"}</p>
              </div>
            </Card>

            {/* Sentiment and Confidence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Sentiment</h3>
                  <Badge className={`${getSentimentColor(analysis.sentiment)} text-sm`}>
                    {analysis.sentiment.toUpperCase() || "PENDING"}
                  </Badge>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Confidence</h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-100 text-blue-800">
                        {analysis.confidence}%
                      </span>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                      <div
                        style={{ width: `${analysis.confidence}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Key Points */}
            <Card>
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold">Key Points</span>
                <Badge variant="outline">{analysis.keyPoints.length} Points</Badge>
              </div>
              <div className="p-4">
                {analysis.keyPoints.length > 0 ? (
                  <ul className="space-y-2">
                    {analysis.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="font-bold">•</span>
                        <span className="">{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="">Key points will appear here after analysis</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
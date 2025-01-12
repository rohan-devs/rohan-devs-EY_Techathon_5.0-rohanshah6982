"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "Positive", value: 60 },
  { name: "Neutral", value: 15 },
  { name: "Negative", value: 25 },
];

const COLORS = ["#4CAF50", "#FFC107", "#F44336"]; // Colors for Positive, Neutral, Negative

const Homepage = () => {
  return (
    <div className="min-h-screen w-full ">
      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className=" hover:scale-110 transition-all">
            <CardHeader>
              <CardTitle>Total Calls Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">150</p>
            </CardContent>
          </Card>

          <Link href={"/tasks"}>
            <Card className=" hover:scale-110 transition-all">
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-500">5</p>
              </CardContent>
            </Card>
          </Link>

          <Card className=" hover:scale-110 transition-all">
            <CardHeader>
              <CardTitle>
                Sentiments <Badge variant="outline">AI</Badge>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-green-500 font-bold">60%</span>
                <span className="text-gray-500">Positive</span>
              </div>
            </CardContent>
          </Card>

          <Card className=" hover:scale-110 transition-all">
            <CardHeader>
              <CardTitle>Priority Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">3</p>
            </CardContent>
          </Card>
        </div>

        {/* Priority Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold  mb-4">
            High-Priority Tasks/Calls{" "}
            <Badge variant="outline">Suggested using AI</Badge>
          </h2>
          <div className="space-y-4">
            <Card className="flex justify-between items-center">
              <div className="px-4 py-2">
                <p className="text-lg font-semibold text-red-600">
                  Task 1 - Urgent
                </p>
                <p className="text-sm ">Complete by: Today 5 PM</p>
              </div>
              <Button className="mr-4">View</Button>
            </Card>

            <Card className="flex justify-between items-center">
              <div className="px-4 py-2">
                <p className="text-lg font-semibold text-red-600">
                  Call with XYZ
                </p>
                <p className="text-sm ">Scheduled at: 2 PM</p>
              </div>
              <Button className="mr-4">Details</Button>
            </Card>
          </div>
        </div>

        {/* Sentiment Analysis and Recent Calls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sentiment Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
            </CardHeader>

            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>

            <CardContent>
              {/* <PieChart
                data={[
                  { label: "Positive", value: 60, color: "green" },
                  { label: "Neutral", value: 30, color: "yellow" },
                  { label: "Negative", value: 10, color: "red" },
                ]}
              /> */}
            </CardContent>
          </Card>

          {/* Recent Calls */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2">Client</th>
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Sentiment</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">XYZ</td>
                    <td className="px-4 py-2">2 PM</td>
                    <td className="px-4 py-2 text-green-600 items-center flex justify-center">
                      😊
                    </td>
                    <td className="px-4 py-2">
                      <Link href={"/sentimentAnalysis"}>
                      <Button>Details</Button>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">ABC</td>
                    <td className="px-4 py-2">Tomorrow</td>
                    <td className="px-4 py-2 text-yellow-600 items-center flex justify-center">
                      😐
                    </td>
                    <td className="px-4 py-2">
                      <Link href={"/sentimentAnalysis"}>
                        <Button>Details</Button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Homepage;

import Homepage from "@/components/Homepage";
import React from "react";

function Page() {
  return (
    <>
   

    <div>
      {" "}
      {/* Wrap your JSX in a single parent element */}
      <h1 className="text-3xl font-bold mx-auto py-8 px-6">Welcome, Nisha</h1>
      <Homepage />

    </div>
    </>
  );
}

export default Page;

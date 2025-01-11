import React from "react";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <>
      <header className="bg-white border-b m-3">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold">BPO AI Dashboard</Link>
          
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button>Log Out</Button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;

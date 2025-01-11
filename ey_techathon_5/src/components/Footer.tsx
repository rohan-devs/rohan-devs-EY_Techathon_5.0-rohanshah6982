import React from "react";
import Link from "next/link";
function Footer() {
  return (
    <>
      <footer className="bg-gray-200 py-4 mt-8 bottom-0 fixed w-full">
        <div className="container mx-auto text-center text-gray-600">
          Made for EY Techathon 5 by{" "}
          <Link
            className=" hover:font-bold"
            href={"https://www.linkedin.com/in/rohanshah129/"}
          >
            Rohan Shah
          </Link>
          {" & "}
          <Link
            className=" hover:font-bold"
            href={"https://www.linkedin.com/in/divanshi-mehta-790369283/"}
          >
            Divanshi Mehta
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;

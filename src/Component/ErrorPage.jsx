import { useRouteError } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";

function ErrorComponent() {
    const err = useRouteError();
  return (
   <div className="flex flex-col justify-center items-center h-screen gap-5">
    <h1 className="text-[150px] font-bold">{err.status}</h1>
    <h1 className="rotate-12 -mt-28 text-white bg-red-600 font-bold px-3">Page Not Found</h1>
   <h1 className="font-semibold text-lg mt-6">The page you're looking for doesn't exist</h1>
   <Link to="/">
   <button className="border bg-blue-500 rounded text-white p-2 hover:scale-[1.03] hover:bg-blue-700">Go Home</button>
   </Link>
   </div>
  );
}



export default ErrorComponent;
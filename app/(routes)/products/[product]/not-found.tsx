import { Button } from "@/components/ui/button";
import { IoAlertCircle } from "react-icons/io5";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-8 rounded shadow-md">
        <IoAlertCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Product Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, the product you are looking for does not exist.</p>
        <Button className="bg-yellow-500 text-white p-2 rounded-md shadow hover:bg-yellow-600">
          <a href="/">Go back to Home</a>
        </Button>
      </div>
    </div>
  );
}

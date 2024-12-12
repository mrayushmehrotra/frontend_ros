import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust the path if needed

interface FileUploadProps {
  handleSubmit: (event: React.FormEvent) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  errorMessage: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  handleSubmit,
  handleFileChange,
  isUploading,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col  items-center  bg-gray-900 text-white mb-5  ">
      <h1 className="text-3xl font-semibold mb-6">web-based ROS Log Viewer</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}{" "}
      {/* Display error message */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-6  border-2 border-dashed    rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Choose a .log or a .txt file
          </label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <Button
          variant="outline"
          type="submit"
          className={`w-full py-2 px-4 ${isUploading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"} text-white font-medium rounded-lg transition`}
          disabled={isUploading} // Disable button when uploading
        >
          {isUploading ? "Uploading..." : "Upload"}{" "}
        </Button>
      </form>
    </div>
  );
};

export default FileUpload;

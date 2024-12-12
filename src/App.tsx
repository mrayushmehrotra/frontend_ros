import React, { useState } from "react";
import FileUpload from "@/components/FileUpload"; // Make sure the path is correct
import LogTable from "@/components/LogTable"; // Make sure the path is correct
import toast, { Toaster } from "react-hot-toast";
interface LogData {
  timestamp: string;
  severity: string;
  source: string;
  message: string;
}

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [logData, setLogData] = useState<LogData[]>([]); // Type defined here

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setErrorMessage(""); // Clear error message on file selection
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setErrorMessage("Please select a file first.");
      toast.error(errorMessage);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true); // Set uploading state
      const response = await fetch("http://127.0.0.1:8000/upload_log/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error("Upload failed. Please try again.");
        throw new Error("Upload failed. Please try again.");
      }

      const result = await response.json();
      console.log(result); // Check the exact structure of the response

      if (result && result.log_data && Array.isArray(result.log_data)) {
        // Check if log_data exists and is an array
        setLogData(result.log_data); // Set the log data from the response
      } else {
        setErrorMessage("No log data available.");
      }

      toast.success(result.message);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("File upload failed!");
      toast.error(errorMessage);
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  };

  return (
    <>
      <Toaster />
      <div className="App p-24">
        <FileUpload
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          isUploading={isUploading}
          errorMessage={errorMessage}
        />
        {logData.length > 0 ? (
          <LogTable logData={logData} />
        ) : (
          <div className="text-center text-white mt-4">
            <h1>No logs available</h1>
            <span className="text-gray-600">
              {" "}
              please Upload a .log or .txt file to view logs
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default App;

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LogTableProps {
  logData: Array<{
    timestamp: string;
    severity: string;
    source: string;
    message: string;
  }>;
}

const LogTable: React.FC<LogTableProps> = ({ logData }) => {
  // State for filter and search
  const [filterSeverity, setFilterSeverity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Function to handle severity filter
  const handleSeverityFilterChange = (value: string) => {
    setFilterSeverity(value === "all" ? null : value);
  };

  // Function to handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter logData based on severity and search query
  const filteredLogs = logData.filter((log) => {
    const matchesSeverity =
      !filterSeverity ||
      log.severity.toLowerCase() === filterSeverity.toLowerCase();
    const matchesSearch =
      log.timestamp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.severity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSeverity && matchesSearch;
  });

  return (
    <>
      <div className="flex justify-between mb-6">
        {/* Filter Component */}
        <Select
         
          onValueChange={handleSeverityFilterChange}
          defaultValue="all"
        >
          <SelectTrigger className="w-[180px] text-white">
            <SelectValue placeholder="Filter by Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className=" text-white bg-gray-900 p-3 border-none ">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="warn">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="fatal">Fatal</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search logs..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg"
        />
      </div>

      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700 hover:bg-gray-800">
              <th className="px-4 py-2 font-medium text-gray-400">TimeStamp</th>
              <th className="px-4 py-2 font-medium text-gray-400">Severity</th>
              <th className="px-4 py-2 font-medium text-gray-400">Source</th>
              <th className="px-4 py-2 font-medium text-gray-400">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <tr className="hover:bg-gray-800" key={index}>
                  <td className="px-4 py-2">{log.timestamp}</td>
                  {log.severity === "WARN" ? (
                    <td className="px-4 py-2 bg-yellow-600">{log.severity}</td>
                  ) : log.severity === "ERROR" ? (
                    <td className="px-4 py-2 bg-red-700">{log.severity}</td>
                  ) : log.severity === "FATAL" ? (
                    <td className="px-4 py-2  bg-purple-800">{log.severity}</td>
                  ) : (
                    <td className="px-4 py-2">{log.severity}</td>
                  )}
                  <td className="px-4 py-2">{log.source}</td>
                  <td className="px-4 py-2">{log.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                  No logs available
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td  className="px-4 py-2 text-center text-gray-500">
                A list of logs.
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default LogTable;

import React from "react";
import { Button } from "@mui/material";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB limit
const ALLOWED_TYPES = ["application/json", ".unsigned"];

const FileUploader = ({ setUnsignedTransactionHex }: { setUnsignedTransactionHex: (hex: string) => void }) => {
  const validateFile = (file: File) => {
    if (!ALLOWED_TYPES.some((type) => file.type === type || file.name.endsWith(type))) {
      alert("Invalid file type. Please upload a .json or .unsigned file.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large. Please upload a file smaller than 2MB.");
      return false;
    }
    return true;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = JSON.parse(event.target?.result as string);
        if (!result.cborHex) {
            throw new Error("Invalid file format: Missing Transaction Hex.");
          }
        console.log("Uploaded file:", result);
        setUnsignedTransactionHex(result.cborHex);
      } catch (error) {
        alert("Error parsing JSON. Please upload a valid file."+error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Button variant="contained" component="label" color="success" sx={{ whiteSpace: "nowrap", px: 3 }}>
      Upload
      <input type="file" hidden onChange={handleFileUpload} />
    </Button>
  );
};

export default FileUploader;

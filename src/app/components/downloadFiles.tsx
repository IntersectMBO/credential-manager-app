import { Button } from '@mui/material';
import React from 'react';

const downloadFile = (data : any, filename : string , fileExtension = "json") => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `${filename}.${fileExtension}`;  
    document.body.appendChild(link);
    link.click();

     // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(data);
};

const downloadSigniture = (govActionID : string, signature : string) => {   
    const data = {
        type: "Unwitnessed Tx ConwayEra",
        description: "Ledger Cddl Format",
        govActionID,
        cborHex: signature
    };
    downloadFile(data, "vote", "signature");
}

interface DownloadButtonProps {
    govActionID: string;
    signature: string;
  }

export default function DownloadButton({ govActionID, signature }: DownloadButtonProps) {
    return <Button variant="contained"
    color="success"
    sx={{ whiteSpace: "nowrap", px: 3 }} 
    onClick={() => downloadSigniture(govActionID, signature)}>Download Signature</Button>;
  }
  
import {Table, TableBody, TableCell, TableContainer, TableRow, Paper, Link, Checkbox, FormControlLabel } from "@mui/material";
import { openInNewTab } from "../utils/txUtils";
import { useState } from "react";

interface VotingDetailsProps {
    govActionID: string;
    voteChoice: string;
    cardanoscan: string;   
    metadataAnchorURL: string;
    metadataAnchorHash: string;
    onAcknowledgeChange: (checked: boolean) => void;
}

export const VotingDetails = ({ 
    govActionID, 
    voteChoice, 
    cardanoscan, 
    metadataAnchorURL, 
    metadataAnchorHash,
    onAcknowledgeChange 
}: VotingDetailsProps) => {
    const [isChecked,setIsChecked] = useState(false);

    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked); 
        onAcknowledgeChange(event.target.checked);
      };
    return (
      <TableContainer sx={{ mb: 3 }}>
        <Table sx={{ mt: 3 }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Governance Action ID{" "}
              </TableCell>
              <TableCell>
                <a
                  href={`${cardanoscan}`}
                  target="_blank"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  {govActionID}
                </a>
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={<Checkbox checked={isChecked} onChange={handleCheckBoxChange} />}
                  label="*Acknowledge"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Vote Choice </TableCell>
              <TableCell>{voteChoice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Metadata Anchor URL
              </TableCell>
              <TableCell>
                <Link
                  onClick={() => openInNewTab(metadataAnchorURL || "")}
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  {metadataAnchorURL}
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Metadata Anchor Hash
              </TableCell>
              <TableCell>{metadataAnchorHash}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
}

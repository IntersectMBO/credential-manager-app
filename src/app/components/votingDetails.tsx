import {Table, TableBody, TableCell, TableContainer, TableRow, Paper, Link, Checkbox, FormControlLabel } from "@mui/material";
import { openInNewTab } from "../utils/txUtils";
import { useState } from "react";
import InfoWithTooltip from "./infoHover";
import { info } from "console";

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
    const [checkboxes, setCheckboxes] = useState({
        ackGovAction: false,
        ackVoteChoice: false,
        ackMetadataAnchor: false,
    });

    const allChecked = Object.values(checkboxes).every(Boolean);

    const handleCheckBoxChange = (name: keyof typeof checkboxes) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedCheckboxes = { ...checkboxes, [name]: event.target.checked };
      setCheckboxes(updatedCheckboxes);
      onAcknowledgeChange(Object.values(updatedCheckboxes).every(Boolean));
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
                <TableCell  style={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                  control={<Checkbox checked={checkboxes.ackGovAction} onChange={handleCheckBoxChange("ackGovAction")} />}
                  label="*"
                  />
                  <InfoWithTooltip info="Please acknowledge that you have checked the governance action details." />
                </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Vote Choice </TableCell>
              <TableCell>{voteChoice}</TableCell>
              <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox checked={checkboxes.ackVoteChoice} onChange={handleCheckBoxChange("ackVoteChoice")} />}
                  label="*"
                />
                 <InfoWithTooltip info="Please acknowledge that you have checked and agreed to the vote choice." />
              </TableCell>
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
              <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox checked={checkboxes.ackMetadataAnchor} onChange={handleCheckBoxChange("ackMetadataAnchor")} />}
                  label="*"
                />
                <InfoWithTooltip info="Please acknowledge that you have checked and agreed to the metadata anchor." />
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

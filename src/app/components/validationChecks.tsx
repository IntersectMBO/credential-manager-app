import { Box, Typography } from "@mui/material";
import InfoWithTooltip from "../components/infoHover";

interface TransactionChecksProps {
  isPartOfSigners: boolean;
  isOneVote: boolean;
  hasCertificates: boolean;
  isSameNetwork: boolean;
  hasICCCredentials: boolean;
  isInOutputPlutusData: boolean;
  isMetadataAnchorValid: boolean;
  isUnsignedTransaction: boolean;
}

export const TransactionChecks = ({
  isPartOfSigners,
  isOneVote,
  hasCertificates,
  isSameNetwork,
  hasICCCredentials,
  isInOutputPlutusData,
  isMetadataAnchorValid,
  isUnsignedTransaction,
}: TransactionChecksProps) => {
  return (

    <Box display="flex" justifyContent="space-between" gap={2}>

      <Box display="flex" flexDirection="column" gap={2} width="48%">
        <Box display="flex" alignItems="center" gap={0.5}>
          <InfoWithTooltip info="Should you be signing this transactions?" />
          <Typography variant="body1" fontWeight="bold">
            Wallet needs to sign?: {isPartOfSigners ? "✅" : "❌"}
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap={0.5}>
          <InfoWithTooltip info="Should you be signing this transactions?" />
          <Typography display="flex" flexDirection="column" width="45%" variant="body1" fontWeight="bold">
          Transaction is unsigned?: {isUnsignedTransaction ? "✅" : "❌"}
        </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap={0.5}>
          <InfoWithTooltip info="Is your wallet connected to the same network that the transaction is for?" />
          <Typography variant="body1" fontWeight="bold">
            Is the transaction in the same network?: {isSameNetwork ? "✅" : "❌"}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={0.5}>
          <InfoWithTooltip info="Does the transaction reference Intersect's ICC credential?" />
          <Typography variant="body1" fontWeight="bold">
            Has Intersect CC credentials?: {hasICCCredentials ? "✅" : "❌"}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={0.5}>
          <InfoWithTooltip info="Explanation about metadata hash" />
          <Typography variant="body1" fontWeight="bold">
            Does the metadata match the provided hash?: {isMetadataAnchorValid ? "✅" : "❌"}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap={2} width="48%">
        <Box display="flex" alignItems="center" gap={0.5}>
          <InfoWithTooltip info="Explanation about one vote" />
          <Typography variant="body1" fontWeight="bold">
            Signing one vote?: {isOneVote ? "✅" : "❌"}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={0.5}>
          <InfoWithTooltip info="Explanation about certificates" />
          <Typography variant="body1" fontWeight="bold">
            Has no certificates?: {hasCertificates ? "❌" : "✅"}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={0.5}>
          <InfoWithTooltip info="Explanation about plutus data" />
          <Typography variant="body1" fontWeight="bold">
            Is stake credential in plutus data?: {isInOutputPlutusData ? "✅" : "❌"}
          </Typography>
        </Box>
      </Box>
    </Box>


  );
};

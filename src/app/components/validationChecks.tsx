import { Box, Typography } from "@mui/material";

interface TransactionChecksProps {
  isPartOfSigners: boolean;
  isOneVote: boolean;
  hasCertificates: boolean;
  isSameNetwork: boolean;
  hasICCCredentials: boolean;
  isInOutputPlutusData: boolean;
}

export const TransactionChecks = ({
  isPartOfSigners,
  isOneVote,
  hasCertificates,
  isSameNetwork,
  hasICCCredentials,
  isInOutputPlutusData,
}: TransactionChecksProps) => {
  return (

      <Box display="flex" flexWrap="wrap" gap={2}>
        <Typography display="flex" flexDirection="column" width="45%" variant="body1" fontWeight="bold">
          Wallet needs to sign?: {isPartOfSigners ? "✅" : "❌"}
        </Typography>

        <Typography display="flex" flexDirection="column" width="45%" variant="body1" fontWeight="bold">
          Signing one vote?: {isOneVote ? "✅" : "❌"}
        </Typography>

        <Typography display="flex" flexDirection="column" width="45%" variant="body1" fontWeight="bold">
          Has no certificates?: {hasCertificates ? "❌" : "✅"}
        </Typography>

        <Typography display="flex" flexDirection="column" width="45%" variant="body1" fontWeight="bold">
          Is the transaction in the same network?: {isSameNetwork ? "✅" : "❌"}
        </Typography>

        <Typography display="flex" flexDirection="column" width="45%" variant="body1" fontWeight="bold">
          Has Intersect CC credentials?: {hasICCCredentials ? "✅" : "❌"}
        </Typography>

        <Typography display="flex" flexDirection="column" width="45%" variant="body1" fontWeight="bold">
          Is stake credential in plutus data?: {isInOutputPlutusData ? "✅" : "❌"}
        </Typography>
      </Box>
  
  );
};

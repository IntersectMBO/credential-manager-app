import { Wallet } from "./components/wallet";
import { TransactionButton } from "./components/transaction";
import { Container, Typography, Box } from "@mui/material";

export default function Home() {
  return (
    // <main>
    //   <h1 className="font-bold uppercase mr-auto">Credential Manager App</h1>
    //   <div className="ml-auto">
    //     <Wallet />
    //     <TransactionButton />
    //   </div>
    // </main>
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", minHeight: "100vh" }}>
    <Typography variant="h4" component="h1" fontWeight="bold" textTransform="uppercase" mb={3} textAlign="center">
      Credential Manager App
    </Typography>

    <Box display="flex" flexDirection="column" alignItems="center" gap={2} width="100%">
      <Wallet />
      <TransactionButton />
    </Box>
  </Container>
  );
}

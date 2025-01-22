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
    <Box
      sx={{
        backgroundImage: 'url(/background.png)',  
        backgroundSize: 'cover',  
        backgroundPosition: 'center',  
        minHeight: '100vh',  
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 2,
      }}
    >


      <Container maxWidth="md" sx={{ display: "flex",  backgroundColor: "white", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", minHeight: "100vh" , padding: 2}}>
        <Box sx={{
          width: "100%",
          backgroundColor: "blue",
          marginTop: "20px",
          padding: "15px 0 15px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}>
          <svg width="150" height="35" viewBox="0 0 609 215" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 66.4V142.5H0V66.4H12.5ZM100.9 142.5H88.5L50.9 85.7V214.7H38.4V66.3H50.9L88.5 123V0H101L100.9 142.5ZM173.1 66.4V76.6H152.8V142.5H140.3V76.6H120V66.4H173.1ZM204.8 76.5V98.8H231.1V109H204.8V132.3H234.4V142.5H192.3V66.3H234.4V76.5H204.8ZM297 142.5L279.5 112.1H270V142.5H257.5V66.4H283.8C289.6 66.4 294.6 67.4 298.6 69.5C302.6 71.5 305.7 74.3 307.7 77.7C309.7 81.1 310.7 85 310.7 89.2C310.7 94.2 309.3 98.7 306.4 102.7C303.5 106.8 299.1 109.5 293.1 111L311.9 142.5H297ZM270 102.1H283.8C288.5 102.1 292 100.9 294.4 98.6C296.8 96.3 298 93.1 298 89.2C298 85.3 296.8 82.2 294.5 80C292.2 77.8 288.6 76.7 283.9 76.7H270V102.1ZM344.3 140.6C340.2 138.8 337 136.3 334.7 133C332.4 129.7 331.2 125.9 331.2 121.5H344.6C344.9 124.8 346.2 127.5 348.5 129.6C350.8 131.7 354 132.8 358.2 132.8C362.4 132.8 365.9 131.8 368.3 129.7C370.7 127.6 371.9 124.9 371.9 121.6C371.9 119 371.1 117 369.7 115.4C368.2 113.8 366.3 112.6 364.1 111.7C361.9 110.8 358.8 109.9 354.9 108.9C349.9 107.6 345.9 106.3 342.8 104.9C339.7 103.6 337 101.5 334.9 98.6C332.7 95.8 331.6 92 331.6 87.2C331.6 82.8 332.7 79 334.9 75.7C337.1 72.4 340.2 69.9 344.1 68.1C348 66.3 352.6 65.5 357.8 65.5C365.2 65.5 371.2 67.3 375.9 71C380.6 74.7 383.2 79.7 383.7 86.2H369.9C369.7 83.4 368.4 81 366 79.1C363.6 77.2 360.4 76.1 356.5 76.1C352.9 76.1 350 77 347.7 78.8C345.4 80.6 344.3 83.2 344.3 86.7C344.3 89 345 90.9 346.4 92.5C347.8 94 349.6 95.2 351.8 96.1C354 97 357 97.9 360.8 98.9C365.8 100.3 369.9 101.7 373.1 103.1C376.3 104.5 379 106.6 381.2 109.5C383.4 112.4 384.5 116.2 384.5 121.1C384.5 125 383.5 128.6 381.4 132C379.3 135.4 376.3 138.2 372.3 140.3C368.3 142.4 363.6 143.4 358.2 143.4C353 143.3 348.4 142.4 344.3 140.6ZM420.1 76.5V98.8H446.4V109H420.1V132.3H449.7V142.5H407.7V66.3H449.7V76.5H420.1ZM471.9 84.3C475.4 78.4 480.1 73.8 486 70.5C492 67.2 498.5 65.5 505.5 65.5C513.6 65.5 520.8 67.5 527.1 71.5C533.4 75.5 538.1 81 541 88.3H526C524 84.3 521.3 81.3 517.8 79.3C514.3 77.3 510.2 76.3 505.7 76.3C500.7 76.3 496.2 77.4 492.2 79.7C488.2 82 485.2 85.2 483 89.4C480.8 93.6 479.7 98.6 479.7 104.2C479.7 109.8 480.8 114.8 483 119C485.2 123.2 488.3 126.5 492.2 128.8C496.1 131.1 500.6 132.2 505.7 132.2C510.3 132.2 514.3 131.2 517.8 129.2C521.3 127.2 524 124.2 526 120.2H541C538.2 127.5 533.6 133.1 527.3 137.1C521 141.1 513.8 143 505.7 143C498.6 143 492 141.3 486.1 138C480.2 134.7 475.5 130.1 472 124.2C468.5 118.3 466.8 111.6 466.8 104.2C466.8 96.8 468.5 90.2 471.9 84.3ZM609 66.4V76.6H588.7V142.5H576.2V76.6H555.8V66.4H609Z" fill="#F5F3EB" />
          </svg>
        </Box>
        <Typography variant="h4" component="h1" fontWeight="bold" textTransform="uppercase" mb={3} textAlign="center" paddingTop={2}>
          Credential Manager App
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
          <Wallet />
          <TransactionButton />
        </Box>
      </Container>
    </Box>
  );
}

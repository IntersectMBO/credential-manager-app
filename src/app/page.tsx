import { Wallet } from "./components/wallet";

export default function Home() {
  return (
    <main>
      <h1 className="font-bold uppercase mr-auto">Credential Manager App</h1>
      <div className="ml-auto">
        <Wallet />
      </div>
    </main>
  );
}

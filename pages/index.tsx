import type { NextPage } from "next";
import MyForm from "./form";
import { getAccount, connectContract } from "../scripts/ethers";
import { useState } from "react";
import { Contract } from "ethers";
const tokens = [
  { id: 0, name: "Elemental manipulation" },
  { id: 1, name: "Mind control" },
  { id: 2, name: "Telekinesis" },
  { id: 3, name: "Immorality" },
  { id: 4, name: "Invisibility" },
];
interface Powers {
  id: number;
  name: string;
  balance: number;
}
const Home: NextPage = () => {
  const [wizard, setWizard] = useState<String | null>(null);
  const [powers, setPowers] = useState<Powers[]>();
  const [isSingleTransfer,setIsSingleTranfer] = useState<Boolean>(false)
  const handleConnectWallet = async () => {
    let account = await getAccount();
    setWizard(account);
    let _power = [];
    const myTokens = await connectContract();
    console.log(myTokens);
    
    if (myTokens) {
      for (let token of tokens) {
        let balance:number = parseInt(await myTokens.balanceOf(account, token.id));
        _power.push( { ...token, balance });
      }
    }
    setPowers(_power)
    
  };
  
  return (
    <div className="bg-[url(/background.jpeg)] bg-cover bg-no-repeat h-screen text-[#FFFFFF]">
      <div className="flex justify-end">
        {wizard ? (
          <p className="text-right">Account:{wizard.slice(0, 6)} ....</p>
        ) : (
          <button onClick={handleConnectWallet}>Connect Wallet</button>
        )}
      </div>
      <div className=" flex justify-center backdrop-blur-lg  bg-white/0.1 w-[70%] h-[70%] mx-auto my-12">
        <div className="text-center  text-[#001f3f]">
          <p className="text-4xl p-4">Welcome Wizard!!</p>
          <p className="text-2xl">You can give powers</p>
          <div className="flex justify-center">
            {powers &&
              powers.map((ele) => (
                <div key={ele.id} className="m-2 text-purple-600">
                  <p>{ele?.name}</p>
                  <p>{ele?.balance}</p>
                </div>
              ))}
          </div>
          {wizard && (
            <div className="flex justify-center m-6">
              <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow" onClick={()=>{setIsSingleTranfer(true)}}>
                Single Transfer
              </button>
              <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">
                Batch Transfer
              </button>
            </div>
          )}
          {isSingleTransfer && <MyForm/>}
        </div>
      </div>
    </div>
  );
};

export default Home;

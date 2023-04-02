import { ethers } from "ethers";
import MyTokens from "../artifacts/contracts/MyTokens.sol/MyTokens.json";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
declare global {
  interface Window {
    ethereum?: any;
  }
}
export const getAccount = async () => {
  await window?.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  let account = accounts[0].toString();
  return account;
};

export const connectContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract   = null;
  if(contractAddress){
       contract = new ethers.Contract(contractAddress, MyTokens.abi, signer);

  }
  return contract;
};

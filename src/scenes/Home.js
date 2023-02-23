import React, { useEffect, useState } from "react";
import Web3 from "web3";
import styled, { keyframes } from "styled-components";

import nftContract from "../ABI/nft";

function Home() {
  const [web3, setWeb3] = useState();
  const [userAccount, setUserAccount] = useState();
  const [myNft, setMyNft] = useState();
  const [Loading, setLoading] = useState(false);

  async function walletHandler() {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        getUserAccountInfo();
        makeContractApi();
      } else {
        console.log("Please install MetaMask");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  async function makeContractApi() {
    const nft = await nftContract(web3);
    setMyNft(nft);
    console.log(nft);
  }
  async function getUserAccountInfo() {
    const accounts = await web3.eth.getAccounts();
    setUserAccount(accounts[0]);
  }

  useEffect(() => {
    try {
      if (typeof window.ethereum !== "undefined") {
        setWeb3(new Web3(window.ethereum));
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const minting = async () => {
    await myNft.methods
      .mint()
      .send({
        value: web3.utils.toWei("0.01", "ether"),
        from: userAccount,
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <HomeContainer>
      <div>Home</div>
      <WalletButton onClick={walletHandler}>CONNECT WALLET</WalletButton>
      <Account>account : {userAccount}</Account>
      <Description>Trip|Ez member를 위한 NFT 입니다.</Description>
      <Description>민팅 가격은 0.01 goerli 입니다.</Description>
      <LoadingSection>{Loading ? "PENDING..." : null}</LoadingSection>
      {userAccount ? (
        <MintButton
          onClick={(e) => {
            minting();
            setLoading(true);
          }}
        >
          mint Button
        </MintButton>
      ) : (
        <MintButtonDeactive>mint Button</MintButtonDeactive>
      )}

      {myNft && <Address>contract address : {myNft._address}</Address>}
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const WalletButton = styled.button`
  width: 150px;
  height: 25px;
  padding: 4px;
  border: 2px solid;
  border-radius: 20px;
  color: #baad98;
  background-color: #48617c;
  cursor: pointer;
`;
const Description = styled.div`
  margin-bottom: 5px;
`;
const MintButton = styled(WalletButton)`
  color: white;
  background-color: hotpink;
`;
const MintButtonDeactive = styled(MintButton)`
  background-color: darkgray;
`;
const Account = styled.div`
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const Address = styled(Account)`
  margin-top: 20px;
`;
const LoadingAnimation = keyframes`
  from {
    color: white;
  }
  to {
    color: blue;
  }
`;
const LoadingSection = styled.div`
  color: black;
  margin-bottom: 20px;
  animation: ${LoadingAnimation} 1s linear infinite;
`;

export default Home;

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
const FormData = require("form-data");
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import { nftaddress } from '../config'
import { OpenSeaPort, Network } from 'opensea-js'
import Web3 from 'web3';

// This example provider won't let you make transactions, only read-only calls:
const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/3c8e7f53bc6442a1876c4dc03e0a1f32')

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Rinkeby
})


export default function Home() {
  const [page, setPage] = useState(1);
  const [nfts, setNfts] = useState([]);
  const [maxpage, setMaxpage] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    var ret = await axios.get('/api/getnfts');
    setMaxpage(ret.data);
    await loadPage();
  }, [])

  async function loadPage() {
    let ret = await axios.post('/api/getnfts', {
      pageIndex: page
    });
    // console.log(ret.data);
    setNfts(ret.data);
  }

  async function spage(dir) {
    let temp = page + dir;
    if (temp < 1) temp = 1;
    if (temp > maxpage - 1) temp = maxpage - 1;
    // alert(temp);
    setPage(temp);
    await loadPage();

  }

  async function changePage(e) {
    let temp = parseInt(e.target.value);
    if (temp < 1) temp = 1;
    if (temp > maxpage) temp = maxpage;
    setPage(temp);
    await loadPage();
    // await mintNFT(1);
  }

  async function mintNFT(e) {
    try{
      setLoading(true);
      //   console.log(e)
    // let fileName = nfts[e];
    // let ret1 = await axios.post('/api/pinImage', {fileName});
    // console.log(ret1.data)
    // let ret2 = await axios.post('api/pinJson', {
    //   data:{
    //     image: ret1.data,
    //     name: 'Demon',
    //   }


    // })
    // console.log(ret2.data);
    // let tokenUri = ret2.data;
    // console.log('heelo')
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    console.log('enter')
    let transaction = await contract.createToken('https://gateway.pinata.cloud/ipfs/QmRJreWJVvbQVhb2YutjDhxWVitaHJdinU2E4FpiEE2ZGi')
    console.log(transaction)
    let tx = await transaction.wait()
    console.log(tx)
    console.log('eee')
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    console.log(tokenId);
    // const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24)

    // const listing = await seaport.createSellOrder({
    //   asset: {
    //     tokenId : tokenId,
    //     tokenAddress: nftaddress,
    //   },
    //   accountAddress: tx.from,
    //   startAmount: 3,
    //   // If `endAmount` is specified, the order will decline in value to that amount until `expirationTime`. Otherwise, it's a fixed-price order:
    //   endAmount: 0.1,
    //   expirationTime
    // })
    // console.log(listing)
    var win = window.open('https://testnets.opensea.io/assets/' + nftaddress.toString() + '/' + tokenId.toString(), '_blank');
    if (win) {
      //Browser has allowed it to be opened
      win.focus();
    } else {
      //Browser has blocked it
      alert('Please allow popups for this website');
    }
    }catch(e){

    }finally{
      setLoading(false);
    }
    
  }

  return (
    <div>
      <div className='flex'>

        {nfts.map((nft, ind) => (
          <div className="max-w-md m-2  bg-white rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500">
            <div className="p-4">
              <img className="rounded-xl" src={"img/output/" + nft} alt="Dog" />
            </div>
            <div className="flex justify-center p-6">
              <button className="py-3 px-6 text-white rounded-lg bg-red-500 shadow-lg block md:inline-block" key={ind} onClick={e => mintNFT(ind)}>Mint Token</button>

            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center '>
        <button className="py-3 m-3 px-6 text-white rounded-lg bg-green-400 shadow-lg block md:inline-block" onClick={async (e) => await spage(-1)}>Previous</button>
        <input className='text-center text-bole' name="q" value={page} onChange={e => changePage(e)}></input>
        <button className="py-3 m-3 px-6 text-white rounded-lg bg-green-400 shadow-lg block md:inline-block" onClick={async (e) => await spage(1)}>Next</button>

      </div>
      {loading && (
        <div>
          <div className='flex justify-center'>
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>

          </div>
          <div className='flex justify-center'>
            <div>Please wait....</div>
          </div>
        </div>
      )}


    </div>


  )
}

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import axios from "axios";
import WalletConnectProvider from '@walletconnect/web3-provider'
import { getdomainurl } from '../lib/utility';
import { nftaddress } from '../config';
import NFT from '../artifacts/contracts/nft.sol/NFT.json'
// import { f1 } from '../lib/db';

export async function getServerSideProps(context) {


    return {
        props: { aa: 1 }, // will be passed to the page component as props
    }
}

export default function Main(props) {
    // var resp = await axios.post()
    const [minting, setMinting] = useState(0);
    const [imgs, setImgs] = useState([])
    const [img, setImg] = useState('0');
    const [mintedImg, setMintedImg] = useState('');
    const [minted, setMinted] = useState(0);
    const [total, setTotal] = useState(0);
    useEffect(async () => {
        // f1();
        console.log(props)
        await getMintCount();
        var ii = []
        for (let i = 0; i < 72; i++) {

            ii.push(i)

        }
        setImgs(ii);
        setInterval(() => {
            var ii = Math.floor(Math.random() * 10);
            setImg(ii.toString());
        }, 200);
    }, [])

    async function getMintCount() {
        var resp = await axios.get('api/getMintCounts');
        // alert(JSON.stringify(resp.data))
        setMinted(resp.data.minted);
        setTotal(resp.data.total);
    }

    async function mint() {
        var mintIndex;
        try {

            const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

            console.log(WalletConnectProvider)
            const providerOptions = {
                /* See Provider Options Section */
                metamask: {
                    id: "injected",
                    name: "MetaMask",
                    type: "injected",
                    check: "isMetaMask"
                },
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        // Mikko's test key - don't copy as your mileage may vary
                        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
                    }
                },
            };

            const web3Modal = new Web3Modal({
                cacheProvider: false, // optional
                providerOptions, // required
            });

            let connection = await web3Modal.connect()
            setMinting(1);
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
            console.log('enter')
            var hostUrl = getdomainurl();
            var resp = await axios.post('api/randomMint', {url: hostUrl});
            mintIndex = resp.data.mintIndex;
            setMintedImg(resp.data.image_url);

            console.log(resp);
            // url = 'https://gateway.pinata.cloud/ipfs/QmRJreWJVvbQVhb2YutjDhxWVitaHJdinU2E4FpiEE2ZGi'
            let transaction = await contract.createToken(resp.data.tokenUri)
            console.log(transaction)
            let tx = await transaction.wait()
            console.log(tx)
            console.log('eee')
            let event = tx.events[0]
            let value = event.args[2]
            let tokenId = value.toNumber()
            console.log(tokenId);
            setMinting(2);
            await axios.post('api/confirmMinted', { mintIndex });
            await getMintCount();
            // var win = window.open('https://testnets.opensea.io/assets/' + nftaddress.toString() + '/' + tokenId.toString(), '_blank');
            // if (win) {
            //     //Browser has allowed it to be opened
            //     win.focus();
            // } else {
            //     //Browser has blocked it
            //     alert('Please allow popups for this website');
            // }
        } catch (e) {
            setMinting(0);
        } finally {
            // setMinting(false);
            // await axios.post('api/confirmMinted', {mintIndex});
            // await getMintCount();
        }

    }
    return (
        <>
            <video autoPlay muted loop id="background-video">
                <source src="./img/bgvideo.mov" type="video/mp4" />
            </video>
            <header className="text-center pt-10 text-5xl font-bold">
                <nav className="flex justify-between px-2 md:text-5xl text-2xl">
                    <h1 className="heading leading-relaxed text-yellow-400">Welcome to</h1>
                    <h1 className="heading leading-relaxed text-yellow-400">Dungeon Demon</h1>
                </nav>
            </header>
            <section className="text-gray-600 body-font relative">
                <div className="
          container
          mx-auto
          flex flex-col
          lg:flex-row
          px-5
          pt-16
          justify-center
          items-center
        ">
                    <img className="
            lg:w-2/6
            md:w-3/6
            w-5/6
            mb-10
            object-cover object-center
            rounded-md
            border-yellow-300 border-4
            js-fun
            animate__animated animate__pulse animate__infinite
          " alt="hero" src="./img/i1.png" />

                    <div className="
            w-full
            md:w-2/3
            flex flex-col
            mb-16
            items-center
            text-center text-white
          " id="font">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
                            Minut Price: <span id="font-p"> 0.033 ETH</span>
                        </h1>
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
                            Amount Minted: <span id="font-p"> {minted}</span>
                        </h1>
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
                            Amount Left: <span id="font-p"> {total - minted}</span>
                        </h1>
                        <div className="relative flex-grow w-full mt-4">
                            {/* <label for="email" className="leading-7 text-sm text-white">Amount to Mint</label> */}
                            {/* <input type="email" id="font-p" name="email" className="
                w-48
                bg-gray-900 bg-opacity-50
                rounded
                border border-gray-300
                focus:border-yellow-500
                focus:bg-transparent
                focus:ring-2
                focus:ring-yellow-200
                text-base
                outline-none
                py-1
                px-3
                leading-8
                transition-colors
                duration-200
                ease-in-out
              " /> */}

                            <div className="flex w-full justify-center items-end pt-5 button-open">
                                <button className="
                  inline-flex
                  text-white
                  bg-red-800
                  border-0
                  py-4
                  px-16
                  focus:outline-none
                  hover:bg-red-600 hover:text-yellow-400
                  rounded
                  text-lg
                  hover:border-yellow-300 hover:border-2
                  button-open
                "  onClick={(e) => { if (minting == 0) mint() }}>
                                    Connect Wallet and Mint
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="main">
                <div className="container-scroll flex-scroll">
                    <div className="item flex-item">
                        <img src="./img/i1.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i2.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i3.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i4.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i5.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i6.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i7.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i8.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i9.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i10.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i11.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i12.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i13.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i14.png" className="img-scroll hover-effect" />
                    </div>
                    <div className="item flex-item">
                        <img src="./img/i15.png" className="img-scroll hover-effect" />
                    </div>
                </div>
            </section>
            {/* <!--  -->
          <!-- Modal 1 --> */}
            {(minting != 0) && (
                <div className="
        fixed
        hidden
        inset-0
        bg-black bg-opacity-80
        overflow-y-auto
        h-full
        w-full
        overlay-modal
      "></div>
            )}

            <div className={"modal1 p-24 flex flex-col items-center bg-gray-50 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 " + ((minting != 1) ? "hidden" : "")}>
                <div className="modal-img">
                    <img src="./img/4380-processing.gif" className="rounded filter w-52" />
                </div>
                <div className="modal-text text-center">
                    <div>
                        <h2 className="text-lg font-semibold mt-2">Minting NFT. Please wait...</h2>
                    </div>
                    {/* <div className="modal-btn text-center">
                <button className="lg:px-6 lg:py-4 px-11 bg-red-600 mt-4 rounded text-white">
                  
                </button>
              </div> */}
                </div>
            </div>
            {/* <!-- Modal 1 -->
          <!-- Modal 2 --> */}

            <div className={"modal2 p-24 flex flex-col items-center rounded-md bg-gray-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 " + ((minting != 2) ? "hidden" : "")}>
                {/* <div>{mintedImg}</div> */}
                <div className="modal-img">
                    {/* <img src="980.png" className="rounded filter w-52 rounded-md drop-shadow-2xl" /> */}

                    <img src={mintedImg} className="rounded filter w-52 rounded-md drop-shadow-2xl" />
                </div>
                <div className="modal-text text-center">
                    <div>
                        <h2 className="text-lg font-semibold mt-2">Mint Success</h2>
                    </div>
                    <div className="modal-btn-close text-center">
                        <button className="lg:px-6 lg:py-4 px-11 bg-red-600 mt-4 rounded text-white" onClick={e => { setMinting(0) }}>
                            New Mint
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
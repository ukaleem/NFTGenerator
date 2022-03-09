import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import axios from "axios";
import WalletConnectProvider from '@walletconnect/web3-provider'

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
    const [minting, setMinting] = useState(false);
    const [imgs, setImgs] = useState([])
    const [img, setImg] = useState('0');
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
            setMinting(true);
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

            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
            console.log('enter')
            var resp = await axios.get('api/randomMint')
            mintIndex = resp.data.mintIndex;
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
            var win = window.open('https://testnets.opensea.io/assets/' + nftaddress.toString() + '/' + tokenId.toString(), '_blank');
            if (win) {
                //Browser has allowed it to be opened
                win.focus();
            } else {
                //Browser has blocked it
                alert('Please allow popups for this website');
            }
        } catch (e) {

        } finally {
            setMinting(false);
            await axios.post('api/confirmMinted', {mintIndex});
            await getMintCount();
        }

    }
    return (
        <>
            {/* <div id="root" aria-hidden="true"> */}
            {/* <div>
                    <div>
                        <div className="MuiGrid-root MuiGrid-container" style={{ width: '100%', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', margin: '0px auto', textAlign: 'center', zIndex: 9999 }}>
                                <div className="MintModal" style={{ position: 'relative', zIndex: 2147483647 }} />
                            </div>
                            {
                                imgs.map((v1) => (
                                    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2 MuiGrid-grid-md-1"><img src="img1.png" alt="Image" className="GucciImage" /></div>

                                ))
                            }
                        </div>
                        <div id="scroll-container">
                            <p className="marquee"><span>3333 GUCCiTROLLS. MINT PRICE: 0.033 ETH, LAUNCHING ON AUGUST 20TH. 3333 GUCCiTROLLS. MINT PRICE: 0.033 ETH. LAUNCHING ON AUGUST 20TH. 3333 GUCCiTROLLS. MINT PRICE: 0.033 ETH. LAUNCHING ON AUGUST 20TH. 3333 GUCCiTROLLS. MINT PRICE: 0.033 ETH. LAUNCHING ON AUGUST 20TH. &nbsp;</span></p>
                            <p className="marquee marquee2"><span>3333 GUCCiTROLLS. MINT PRICE: 0.033 ETH, LAUNCHING ON AUGUST 20TH. 3333 GUCCiTROLLS. MINT PRICE: 0.033 ETH. LAUNCHING ON AUGUST 20TH. 3333 GUCCiTROLLS. MINT PRICE: 0.033 ETH. LAUNCHING ON AUGUST 20TH. 3333 GUCCiTROLLS. MINT PRICE: 0.033 ETH. LAUNCHING ON AUGUST 20TH. &nbsp;</span></p>
                        </div>
                        <h3 className="WhiteFontHeader" style={{ margin: '120px auto 0px', display: 'block', textAlign: 'center', fontSize: '50px' }}>✧ﾟ･ABOUT･ﾟ✧</h3>
                        <p style={{ margin: '15px auto 0px', display: 'block', textAlign: 'center', width: '60%', fontSize: '22px' }}>GucciTrolls are a collection of 3,333 NFTs on Ethereum. These NFTs have no utility - there’s no roadmap, and there is no promised future development. Enjoy the GucciTrolls for what they are - cryptographically verifiable jpegs.</p>
                        <div className="BorderContainer" style={{ marginTop: '30px' }}>
                            <div className="MuiGrid-root MuiGrid-container">
                                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6"><a href="https://etherscan.io/address/0xb585bee8176918f58c7e3e62aa194971f7e10346" target="_blank" rel="noreferrer" className="WhiteFont" style={{ textDecoration: 'none', margin: '30px auto 0px', textAlign: 'center', display: 'block', fontSize: '20px', color: 'white' }}>VIEW CONTRACT ON ETHERSCAN</a></div>
                                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6"><a href="https://opensea.io/collection/guccitrolls" target="_blank" rel="noreferrer" className="WhiteFont" style={{ textDecoration: 'none', margin: '30px auto 0px', textAlign: 'center', display: 'block', fontSize: '20px', color: 'white' }}>VIEW COLLECTION ON OPENSEA</a></div>
                            </div>
                        </div>
                        <h3 className="WhiteFontHeader GucciTrollsText" style={{ margin: '150px auto 20px', display: 'block', textAlign: 'center', fontSize: '50px' }}>✧ﾟ･THE GUCCiTROLLS･ﾟ✧</h3>
                        <div style={{ display: 'block', margin: '0px auto', width: '100%' }}>
                            <div className="MuiGrid-root MuiGrid-container">
                                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-1" />
                                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-1">
                                    <img src="img1.png" alt="Troll" style={{ width: '100%' }} />
                                    <p className="ColorText" style={{ paddingTop: '10px', margin: '0px auto', textAlign: 'center', fontSize: '14px' }}>Red</p>
                                </div>
                                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-1" />
                            </div>
                        </div>
                        <h3 className="WhiteFontHeader GucciTrollsText" style={{ margin: '150px auto 5px', display: 'block', textAlign: 'center', fontSize: '50px' }}>✧ﾟ･RARITIES･ﾟ✧</h3>
                        <p style={{ margin: '0px auto 50px', display: 'block', textAlign: 'center', width: '80%', fontSize: '16px' }}>GucciTrolls have four different backgrounds: Violet, Lilac, Blue, and Navy. There are 10 different GucciTroll bodies, in the colors: Red, Orange, Hot Pink, Bubblegum, Violet, Lilac, Periwinkle, Tiffany, Mint Green, and Gray. You can view the possibility of minting each combination of GucciTroll below:</p>
                        <div style={{ display: 'block', margin: '0px auto', width: '90%' }}>
                            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3">
                                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-3 MuiGrid-grid-lg-2">
                                    <h5 className="WhiteFont" style={{ fontSize: '20px', margin: '0px auto 10px' }}>#0</h5>
                                    <img src="img1.png" alt="Troll" style={{ width: '100%', backgroundColor: 'rgb(115, 63, 215)' }} />
                                    <p style={{ margin: '0px auto', fontSize: '14px', paddingTop: '5px', fontWeight: 600 }}>RARITY: 0.09%</p>
                                    <p style={{ margin: '0px auto', fontSize: '14px', paddingTop: '5px', fontWeight: 600 }}>QUANTITY: 3</p>
                                </div>
                                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-1" />
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '120px' }} />
                        <div className="BorderContainer">
                            <h3 className="WhiteFontHeader GucciTrollsText" style={{ margin: '150px auto 5px', display: 'block', textAlign: 'center', fontSize: '50px' }}>✧ﾟ･QUESTIONS?･ﾟ✧</h3>
                            <p style={{ margin: '10px auto 0px', display: 'block', textAlign: 'center', width: '60%', fontSize: '18px' }}>Don't contact me. Ever.</p>
                        </div>
                        <div style={{ width: '100%', height: '250px' }} />
                    </div>
                </div> */}
            {/* </div> */}
            {/* <div role="presentation" className="MuiDialog-root" style={{ position: 'fixed', zIndex: 1300, inset: '0px' }}> */}
            <div className="MuiBackdrop-root" aria-hidden="true" style={{ opacity: 1, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }} />
            <div tabIndex={0} data-test="sentinelStart" />
            <div className="MuiDialog-container MuiDialog-scrollPaper" role="none presentation" tabIndex={-1} style={{ opacity: 1, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}>
                <div className="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthMd MuiDialog-paperFullWidth MuiPaper-elevation24 MuiPaper-rounded" role="dialog" aria-labelledby="customized-dialog-title">
                    <div style={{ padding: '50px', backgroundColor: 'black' }}>
                        <h1 className="WhiteFontHeader MintHeaderText" style={{ margin: '15px auto 0px', display: 'block', textAlign: 'center', color: 'white', fontSize: '50px' }}>✧ﾟ･MINT A Demon NFTs･ﾟ✧</h1>
                        <a href="https://rinkeby.etherscan.io/address/0xCBFc74E6873e368480B78A453F395cae824133E6#code" target="_blank" rel="noreferrer" className="EtherscanLink" style={{ textDecoration: 'none', margin: '3px auto 80px', textAlign: 'center', display: 'block', fontSize: '16px', color: 'rgb(115, 63, 215)' }}>CLICK TO VIEW CONTRACT ON ETHERSCAN</a>
                        <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2">
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 center-my">
                                {!minting && (
                                    <img src={"rnds/" + img + '.png'} className="TrollsImg" alt="Trolls" style={{ width: '80%', display: 'block', margin: '0px auto 50px' ,borderRadius:"20px"}} />
                                )}
                                {minting && (
                                    <div className="loader"></div>
                                )}
                            </div>
                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6">
                                <div>
                                    <h4 style={{ color: 'white' }}>Mint Price: 0.033 ETH</h4>
                                    <h4 style={{ color: 'white' }}> AMOUNT MINTED: {minted}</h4>
                                    <h4 style={{ color: 'white' }}> AMOUNT LEFT: {total - minted}</h4>
                                    <div className="GlowDivider" />
                                    <div className="MuiGrid-root MuiGrid-container">
                                        <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6">
                                            <p style={{ color: 'white' }}>AMOUNT TO MINT:</p>
                                        </div>
                                        <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6"><input type="number" id="amountToMint" name="Amount to Mint" min={1} max={33} defaultValue={1} style={{ display: 'block', padding: '5px', textAlign: 'center', margin: '15px auto 0px', pointerEvents:'none' }} /></div>
                                    </div>
                                    <button className="ModalButton">
                                        <p className="WhiteFont" style={{ fontSize: "20px" }} onClick={(e) => { if(!minting) mint() }}>{(minting)? 'Minting...':'CONNECT WALLET AND MINT'}</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div tabIndex={0} data-test="sentinelEnd" />
            {/* </div> */}

        </>
    )
}
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { contractAddress } from "../contract/contractAddress";
import { toast } from 'react-toastify';
// import { Spinner } from './Spinner/Spinner';
// import { Button, Container, Row, Col, Input, Card, Spinner } from 'reactstrap';
import Staking from "../ABI/Staking.json";
import { Web3Context } from '../hooks/web3Context';
import Web3 from "web3";
import * as BigNumber from 'bignumber.js';

const BnbCard = () => {


    const metaWeb3 = new Web3(window.ethereum);
    const [amount, setAmount] = React.useState(0.0);
    // const [buttonDisable, setButtonDisable] = useState(false);
    // const [isLoding, setIsLoding] = useState(false);
    const [currentWalletAddress, setCurrentWalletAddress] = useState("");
    const { web3Val } = useContext(Web3Context);
    const [currentContractBNBSupply, SetCurrentContractBNBSupply] = useState("");
    const [currentWalletBNBSupply, SetCurrentWalletBNBSupply] = useState("");
    const [processingBuy, setProcessingBuy] = useState(false);
    const [rewardBNBsupply, SetRewardBNBSupply] = useState("");
    const [yourBeanSupply, SetYourBeanSupply] = useState("");
    const [ref, setRef] = useState("");
    const dispatch = useDispatch();
    const userAddress = useSelector(state => state.userAddress);
    const ContactConnection = new metaWeb3.eth.Contract(Staking, contractAddress);
    const DEFAULT_TOKEN_DECIMAL = new BigNumber(10).pow(18);

    const checkAmount = (e) => {
        const checkAmount = e.target.value;
        setAmount(checkAmount);
    }



    useEffect(() => {
        let isSubscribed = true;

        if (web3Val != null) {
            const signer = web3Val.getSigner();
            signer.getAddress().then(address => {

                const CAddress = address;
                if (isSubscribed) {

                    setCurrentWalletAddress(CAddress);

                }
                ContactConnection.methods.getBalance().call().then((result) => {
                    SetCurrentContractBNBSupply(result);

                });
                ContactConnection.methods.getMyMiners(CAddress).call().then((result) => {
                    SetYourBeanSupply(result);
                    console.log("mybean =", result);

                });
                ContactConnection.methods.beanRewards(CAddress).call().then((result) => {
                    console.log("bnb =", result);
                    const Temp = new BigNumber(result.toString());
                    const r = Temp.div(DEFAULT_TOKEN_DECIMAL);
                    console.log("bnb ++++++++=", r.toFixed(6));
                    SetRewardBNBSupply(r.toFixed(6));


                });

            });
            signer.getBalance().then(balance => {
                const b = new BigNumber(balance.toString());
                const result = b.div(DEFAULT_TOKEN_DECIMAL);
                console.log('result = ', result.toFixed(4));
                SetCurrentWalletBNBSupply(result.toFixed(4));
            });
        }

        return () => {
            isSubscribed = false;
        }
    }, [web3Val]);

    useEffect(async () => {
        const defaultAccounts = await metaWeb3.eth.getAccounts();

        if (defaultAccounts.length > 0) {

            dispatch({ type: "set", userAddress: defaultAccounts[0] });

            const queryParams = new URLSearchParams(window.location.search);

            const ref = queryParams.get("ref") === null ? defaultAccounts[0] : queryParams.get("ref");

            setRef(ref)
            console.log(ref);
        }

    }, [userAddress]);



    const handleDeposit = async () => {
        console.log("ref = ", ref);
        console.log(" currentaddress = ", currentWalletAddress)
        setProcessingBuy(true);
        if (currentWalletAddress !== '') {
            if (isNaN(amount) || amount === '' || amount === 0) {
                setProcessingBuy(false);

                toast.warning("please input field")
                return;
            }
            ContactConnection.methods.buyEggs(ref).send({ from: currentWalletAddress, value: metaWeb3.utils.toWei(amount, 'ether') }).on('receipt', (
            ) => {
                setProcessingBuy(false);
                toast.success("Successfully Done.")
            }).catch((error) => {

                setButtonDisable(false);
                toast.error("something is wrong.")
            });
        } else {
            setProcessingBuy(false)
            toast.warning("please connect the wallet.")
        }
    }

    const handleRebake = async () => {
        setProcessingBuy(true);
        if (currentWalletAddress !== '') {

            ContactConnection.methods.hatchEggs(ref).send({ from: currentWalletAddress }).on('receipt', (
            ) => {
                setProcessingBuy(false);

                toast.success("Successfully Done.")
            }).on('error', () => {

                setButtonDisable(false);
                toast.error("something is wrong.")
            });
        } else {
            setProcessingBuy(false)
            toast.warning("please connect the wallet.")
        }
    }

    const handleWithdraw = async () => {

        if (currentWalletAddress !== '') {
            setProcessingBuy(true);
            if (yourBeanSupply === '' || yourBeanSupply === 0) {
                setProcessingBuy(false);
                toast.warning("Please Staking First")
                return;
            }
            ContactConnection.methods.sellEggs().send({ from: currentWalletAddress }).on('receipt', (
            ) => {

                toast.success("Successfully Done.")
                setProcessingBuy(false);
            }).on('error', () => {


                toast.error("something is wrong.")
                setButtonDisable(false);
            });
        } else {

            toast.warning("please connect the wallet.")
            setProcessingBuy(false)
        }
    }

    const copyAddress = () => {
        console.log("okay");
        toast.success("Successfully copied to clipboard")
    }



    return (
        <>
            <div className="rounded-2xl mt-40 px-30 pt-25 bg-black border-4 border-blue-500 bg-opacity-80 flex flex-col">
                <div className="flex justify-between mt-10">
                    <p className="text-25 text-green3">
                        Contract
                    </p>
                    <p className="text-25 text-green3">
                        {currentContractBNBSupply / 10 ** 18} BNB
                    </p>
                </div>
                <div className="flex justify-between mt-10">
                    <p className="text-25 text-green3">
                        Wallet
                    </p>
                    <p className="text-25 text-green3">
                        {currentWalletBNBSupply} BNB
                    </p>
                </div>
                <div className="flex justify-between mt-10">
                    <p className="text-25 text-green3">
                        Your Fuel
                    </p>
                    <p className="text-25 text-green3">
                        {yourBeanSupply} Fuel
                    </p>
                </div>
                <div className="my-30">
                    <div className="border-2 border-blue-500 py-5 h-fit rounded-xl flex w-full px-10 mb-15 justify-between">
                        <input onChange={(e) => checkAmount(e)} disabled={processingBuy}
                            className=" bg-white bg-opacity-30 rounded-3xl text-green3 font-medium cursor-text text-right text-25 pr-15 w-full" />
                        <p className="text-30 font-medium text-green1">BNB</p>
                    </div>

                    <div className="py-10 flex justify-center border-b-4 border-black">
                        <button onClick={handleDeposit} className={`${!processingBuy ? "bg-opacity-40" : ""}flex text-green3 items-center border-2 border-blue-500  active:bg-blue-800 justify-center my-20 py-20 bg-black rounded-lg w-full font-medium text-26`}>
                            <> Take-off</>
                        </button>
                    </div>

                    <div className="flex justify-between my-20">
                        <p className="text-25 text-green3">
                            Your Rewards
                        </p>
                        <p className="text-25 text-green3">
                            {rewardBNBsupply} BNB
                        </p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <button onClick={handleRebake} className="flex text-green3 active:bg-blue-800 items-center justify-center py-10 px-30 border-2 border-blue-500 1 rounded-lg font-medium text-20">
                            RE-FUEL
                        </button>
                        <button onClick={handleWithdraw} className="flex items-center active:bg-blue-800 justify-center py-10 text-green3 px-30 border-2 border-blue-500  rounded-lg font-medium text-20">
                            LAND
                        </button>
                    </div>
                    <div className="border-b-8 border-green1">
                        <p className="text-green1 text-30 font-semibold mb-10">Natrition Facts</p>
                    </div>

                    <div className="flex flex-col py-20">
                        <div className="flex justify-between mt-10">
                            <p className="text-25 text-green1">
                                Daily Return
                            </p>
                            <p className="text-25 text-green1">
                                8 %
                            </p>
                        </div>
                        <div className="flex justify-between mt-10">
                            <p className="text-25 text-green1">
                                ARP
                            </p>
                            <p className="text-25 text-green1">
                                2920%
                            </p>
                        </div>
                        <div className="flex justify-between mt-10">
                            <p className="text-25 text-green1">
                                Dev Fee
                            </p>
                            <p className="text-25 text-green1">
                                3 %
                            </p>
                        </div>
                    </div>


                </div>
            </div>
            <div className="rounded-2xl my-40 px-30 py-25 bg-yellow-200 container ">
                <p className="mb-10 text-30 font-medium flex justify-center">Referral Link</p>
                <div className=" border-2 border-black rounded-lg px-5 py-5">
                    <CopyToClipboard text={`http://localhost:3000?ref=${currentWalletAddress}`} onCopy={copyAddress}>
                        {/* <>
                      <p>Share your referral link<a style={{ float: 'right', cursor: 'pointer' }}><FontAwesomeIcon icon={faClipboardCheck} /></a></p> */}
                        <a style={{
                            fontSize: 15, textDecoration: 'underline', cursor: 'pointer',
                            overflowWrap: 'break-word'
                        }}>http://localhost:3000?ref={currentWalletAddress}</a>
                        {/* </> */}
                    </CopyToClipboard>
                </div>
                <p className="text-16 w-full mt-10">Earn 12% of the BNB used to bake beans from anyone who uses your referral link</p>

            </div>

        </>
    );
};
export default BnbCard;
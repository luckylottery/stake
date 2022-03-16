import Logo1 from "../../assets/image/logo3.png";
import Bscscan from "../../assets/image/Bscscan.png";
import Telegram from "../../assets/image/Telegram.png";
import Tweitter from "../../assets/image/Tewitter.png";
import BnbCard from "../../components/BNBcard";
import Web3Modals from "../../components/Web3modal";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-black flex justify-center min-h-screen py-50 px-5 relative">
      <div className="fixed top-20 left-3/4 hidden lap:block">
        <Web3Modals />
      </div>
      <div className="max-w-main-container w-full">
        <div className="w-full">
          <img src={Logo1} alt="logo" className="w-full" />
        </div>

        <div className="w-full mt-20 lap:hidden">
          <Web3Modals />
        </div>
        <BnbCard />
        <div className="flex flex-row w-full justify-center">
        <div className="flex flex-row border-2 rounded-3xl border-blue-500 bg-cyan-300">
          <a href="https://www.bscscan.com/address/0xE2D26507981A4dAaaA8040bae1846C14E0Fb56bF" target="__blank">
            <img src={Bscscan} alt="Bscscan" width="50px" height="50px" className="mx-15" />
          </a>
          <a href="https://t.me/+weLKTf0-ewgwZTVh" target="__blank">
            <img src={Telegram} alt="Telegram" width="50px" height="50px" className="mx-15" />
          </a>
          <a href="" target="__blank">
            <img src={Tweitter} alt="Tweitter" width="50px" height="50px" className="mx-15" />
          </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainLayout;
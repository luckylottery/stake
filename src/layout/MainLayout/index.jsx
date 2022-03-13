import Logo from "../../assets/image/Logo1.jpg";
import Bscscan from "../../assets/image/Bscscan.png";
import Telegram from "../../assets/image/Telegram.png";
import Tweitter from "../../assets/image/Tewitter.png";
import BnbCard from "../../components/BNBcard";
//import Referrals from "../../components/Referrals";
import Web3Modals from "../../components/Web3modal";
import logo1 from "../../assets/image/Homepage/SVG/Asset 410.svg"
const MainLayout = ({ children }) => {
  return (
    <div className="bg-black flex justify-center min-h-screen py-50 px-5 relative">
      <div className="fixed top-20 left-3/4 hidden md:block">
        <Web3Modals />
      </div>
      <div className="max-w-main-container w-full">
        <div className="w-full">
          <img src={logo1} alt="logo" className="w-full" />
        </div>

        <div className="w-full mt-20 md:hidden">
          <Web3Modals />
        </div>
        <BnbCard />
        {/* <Referrals /> */}
        <div className="flex flex-row w-full justify-center">
          <a href="https://www.bscscan.com/address/0xE2D26507981A4dAaaA8040bae1846C14E0Fb56bF" target="__blank">
            <img src={Bscscan} alt="Bscscan" width="50px" height="50px" className="mx-10" />
          </a>
          <a href="https://www.bscscan.com/address/0xE2D26507981A4dAaaA8040bae1846C14E0Fb56bF" target="__blank">
            <img src={Telegram} alt="Telegram" width="50px" height="50px" className="mx-10" />
          </a>
          <a href="https://www.bscscan.com/address/0xE2D26507981A4dAaaA8040bae1846C14E0Fb56bF" target="__blank">
            <img src={Tweitter} alt="Tweitter" width="50px" height="50px" className="mx-10" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default MainLayout;
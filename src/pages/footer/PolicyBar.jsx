import { useParams } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import PolicyContent from "./PolicyContent";
import ToggleBar from "../../components/toggleBar/ToggleBar";

const PolicyBar = () => {
  const { id } = useParams();

  return (
    <div className="policy-bar">
      <MainNav />
      <ToggleBar
        defaultRoute={id}
        firstName="개인정보 처리방침"
        firstComponent={<PolicyContent page={0} />}
        secondName="이용약관"
        secondComponent={<PolicyContent page={1} />}
      />
      <Footer />
    </div>
  );
};

export default PolicyBar;

import useWindowDimensions from "@/hooks/useWindowDimensions";
import SmallOnOffBtn from "../button/RoundBtn_135_40";

interface PurchaseMethodBtnProps {
  children: string;
  isSelected: boolean;
  onClick: () => void;
}

const PurchaseMethodBtn = ({
  children,
  isSelected,
  onClick,
}: PurchaseMethodBtnProps) => {
  const { isTablet } = useWindowDimensions().widthConditions;
  return (
    <SmallOnOffBtn
      color={isSelected ? "purple" : "grey"}
      onClick={onClick}
      style={{
        width: !isTablet ? "108px" : "128px",
        height: "36px",
        border: isSelected ? "3px solid var(--purple-purple-7, #B489FF)" : "",
      }}
    >
      {children}
    </SmallOnOffBtn>
  );
};

export default PurchaseMethodBtn;

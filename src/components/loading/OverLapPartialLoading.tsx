import { Dialog, DialogContent } from "@mui/material";

import PartialLoading from "./PartialLoading";

interface OverLapPartialLoadingProps {
  isLoading: boolean;
}

const OverLapPartialLoading: React.FC<OverLapPartialLoadingProps> = ({ isLoading }) => {
  return (
    <>
      <Dialog open={isLoading}>
        <DialogContent className="loading-dialog">
          <PartialLoading />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OverLapPartialLoading;

import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)} 
      className="text-blue-600 hover:underline flex"
    >
      <MoveLeft/> Back
    </button>
  );
};

export default BackButton;

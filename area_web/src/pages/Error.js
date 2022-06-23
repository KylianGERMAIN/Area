import "./Error.css";
import {useNavigate} from "react-router";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="box_contain_error">
      <div className="box_contain_error_top">
        <p>An error has been detected</p>
        <button className="button" onClick={() => navigate("/")}>
          Go to login
        </button>
      </div>
    </div>
  );
}

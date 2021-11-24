import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import http from "../../axios-config";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ClassTabs from "components/Class/ClassTabs/ClassTabs";


export default function ClassDetail() {
  const [item, setItem] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();
  const cjc = new URLSearchParams(search).get("cjc");
  const strQuery = (cjc)? `?cjc=${cjc}`:'';
  let params = useParams();

  useEffect(() => {
    async function fetchClass() {
      console.log("fetchdetail");
      let id = params.id;
      await http.get(`/classes/${id}`+strQuery).then(
        (result) => {
          if(result.status === 401){
            navigate("/login");
          }
          setItem(result.data);
          // return result;
        },
        (error) => {
          navigate("/login");
          console.log(error);
        }
      );
    }
    fetchClass();
  }, []);
  return (
    <Card variant="outlined">
      <ClassTabs item={item} />
    </Card>
  );
}

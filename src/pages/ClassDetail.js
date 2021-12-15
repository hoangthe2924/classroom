import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ClassTabs from "components/Class/ClassTabs/ClassTabs";
import { fetchClassDetail } from "services/class.service";

export default function ClassDetail() {
  const [item, setItem] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();
  const cjc = new URLSearchParams(search).get("cjc");
  const strQuery = cjc ? `?cjc=${cjc}` : "";
  let params = useParams();

  localStorage.removeItem('prev-link');

  async function fetchClass() {
    let id = params.id;
    await fetchClassDetail(id, strQuery).then(
      (result) => {
        if (result.status === 401) {
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
  function handleUpdate() {
    fetchClass();
  }
  useEffect(() => {
    fetchClass();
  }, []);
  return (
    <Card variant="outlined">
      <ClassTabs item={item} onUpdate={handleUpdate} />
    </Card>
  );
}

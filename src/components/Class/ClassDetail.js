import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import http from "../../axios-config";
import { useParams } from "react-router-dom";
import ClassTabs from "components/Class/ClassTabs/ClassTabs";
export default function ClassDetail() {
  const [item, setItem] = useState([]);
  let params = useParams();

  useEffect(() => {
    async function fetchClass() {
      console.log("fetchdetail");
      let id = params.id;
      await http.get(`/classes/${id}`).then(
        (result) => {
          setItem(result.data);
          // return result;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    fetchClass();
    console.log("hi");
  }, []);
  return (
    <Card variant="outlined">
      <ClassTabs item={item} />
    </Card>
  );
}

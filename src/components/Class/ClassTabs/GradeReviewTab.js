import { getAllGradeReviewOfClass } from "services/grade.service";
import { useState, Fragment, useEffect } from "react";
import Loading from "components/Loading";
import { useParams } from "react-router-dom";
import { Typography, Divider } from "@mui/material";
import ListGradeReviewRequest from "components/Class/ClassTabs/utils/GradeReview/ListGradeReviewRequest";

export default function GradeReviewTab({ props }) {
  const [openLoading, setOpenLoading] = useState(false);
  const [listGR, setListGR] = useState([]);
  const params = useParams();

  const fetchListGradeReview = async () => {
    try {
      setOpenLoading(true);
      const res = await getAllGradeReviewOfClass(params.id);
      setListGR(res.data);
      setOpenLoading(false);
    } catch (error) {
      setOpenLoading(false);
    }
  };

  useEffect(()=>{
    fetchListGradeReview();
  },[]);

  const handleUpdate = () => {
    fetchListGradeReview();
  }
  

  return (
    <Fragment>
      <Typography sx={{ m: 1 }} variant="h4">
        Grade Review Requests
      </Typography>
      <Divider sx={{my: 2}} width="100%" />
      <ListGradeReviewRequest list={listGR} onUpdate={handleUpdate}/>
      <Loading open={openLoading} />
    </Fragment>
  );
}

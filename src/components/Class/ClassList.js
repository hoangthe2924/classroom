import {useEffect, useState} from "react";
import {Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import * as PropTypes from "prop-types";
import AddClass from "./AddClass";

function LoadingButton(props) {
    return null;
}

LoadingButton.propTypes = {
    onClick: PropTypes.any,
    variant: PropTypes.string,
    loading: PropTypes.any,
    loadingPosition: PropTypes.string,
    endIcon: PropTypes.element,
    children: PropTypes.node
};

export default () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:3000/classes")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    return <Grid container spacing={3} direction="row"
                 justify="flex-start"
                 padding={10}
                 alignItems="flex-start">
        <AddClass/>
    {items.map(cls =>
            <Grid item xs={12} sm={6} md={4} >
            <Card >
        <CardActionArea sx={{ minHeight: 200 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {cls.className}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Class Description
                </Typography>
            </CardContent>
        </CardActionArea>
            </Card>
            </Grid>
        )}

    </Grid>

}
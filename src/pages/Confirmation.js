import { useEffect, useState } from 'react';
import http from "axios-config";
import { useParams } from "react-router-dom";

function Confirmation(props) {
    const [result, setResult] = useState("Error occured!")
    const params = useParams();
    async function confirmRegistration(){
        const result = await http.get("users/confirm/"+ params.token);
        setResult(result.data.message);
    }
    useEffect(() => {
        confirmRegistration()
    }, []);
    return <h1>{result}</h1>;
}

export default Confirmation;

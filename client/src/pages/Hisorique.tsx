import axios from "axios";
import { useState, useEffect } from "react";
export default function Historique () {
    const [data, setData] = useState([]);

    const loaddata = async () => {
        const response = await axios.get("http://localhost:7000/api/get")
        console.log(response.data);
        setData(response.data);
    }
    useEffect(() => {
        loaddata()
    },[])

    return (
        <>
            <table className="justify-center">
                <thead className=" m-5">
                    <th>IdUtilisateur</th>
                    <th>Statut</th>
                    <th>Motif</th>
                    <th>Date</th>
                </thead>
                <tbody>
                    {
                        data.map(da => (
                            <tr className="even:bg-[rgba(245,242,242,0.94)] odd:bg-[rgb(247,243,243)]">
                                <td>{da.idUt}</td>
                                <td>{da.statut}</td>
                                <td>{da.motif}</td>
                                <td>{data.date}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </>
    )
}
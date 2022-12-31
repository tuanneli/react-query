import React from 'react';
import axios from "axios";
import {useQueries} from "react-query";

const DynamicParallels = ({heroeIds}) => {
    const fetchSuperheroe = (heroId) => {
        return axios.get(`http://localhost:4000/superheroes/${heroId}`)
    }
    const queryResults = useQueries(
        heroeIds.map(id => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperheroe(id),
            }
        })
    )

    console.log(queryResults)

    return (
        <div>

        </div>
    );
};

export default DynamicParallels;
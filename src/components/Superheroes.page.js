import React, {useEffect, useState} from 'react';
import axios from "axios";

const SuperheroesPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/superheroes')
            .then(res => {
                setData(res.data)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <h1 className={"w-[100vw] h-[100vh] flex justify-center items-center text-4xl"}>Loading...</h1>
    }

    return (
        <div>
            <h2 className={"font-bold"}>SuperheroesPage:</h2>
            {data.map((hero) => {
                return <div key={hero.id}>{hero.name}</div>
            })}
        </div>
    );
};

export default SuperheroesPage;
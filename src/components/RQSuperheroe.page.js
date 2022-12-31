import React from 'react';
import {useParams} from "react-router-dom";
import {useSuperHeroData} from "../hooks/useSuperHeroData";

const RQSuperheroePage = () => {

    const {heroId} = useParams();
    const {isLoading, data, isError, error} = useSuperHeroData(heroId);

    if (isLoading) {
        return <h1 className={"w-[100vw] h-[100vh] flex justify-center items-center text-4xl"}>Loading...</h1>
    }

    if (isError) {
        return <h1
            className={"w-[100vw] h-[100vh] flex justify-center items-center text-4xl text-red-600"}>{error.message}</h1>
    }

    return (
        <div>
            {data?.data.name} - {data?.data.alterEgo}
        </div>
    );
};

export default RQSuperheroePage;
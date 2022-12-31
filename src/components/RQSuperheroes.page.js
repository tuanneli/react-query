import React, {useState} from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import {useSuperheroesData} from "../hooks/useSuperheroesData";
import {Link} from "react-router-dom";
import {useAddSuperheroData} from "../hooks/useSuperHeroData";

export const fetchSuperheroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const RqSuperheroesPage = () => {

    const onSuccess = (success) => {
        console.log('Performed successfully', success);
    }

    const onError = (error) => {
        console.log('Performed with an error', error);
    }

    const {isLoading, data, isError, error, isFetching, refetch} = useSuperheroesData(onSuccess, onError)
    //     useQuery(
    //     'super-heroes',
    //     fetchSuperheroes,
    //     {
    //         // cacheTime: 30000, /// For how long it says in cache
    //         // staleTime: 0, /// For how often it can refresh
    //         // refetchOnMount: true, /// Refreshes the data each time the component Mounts
    //         // refetchOnWindowFocus: true,
    //         // refetchInterval: 0, /// Automatically refetches the data
    //         // refetchIntervalInBackground: false, /// Continues refetch the data even when the browser is not in focus
    //         // enabled: false
    //         // onSuccess: onSuccess,
    //         // onError: onError
    //         // select: (data) => {
    //         //     return data.data.map(hero => hero.name)
    //         // } /// changes the information that we store in data
    //     }
    // )

    // console.log('isLoading: ', isLoading, 'isFetching: ', isFetching);

    const [name, setName] = useState("");
    const [alterAgo, setAlterAgo] = useState("");

    const {mutate} = useAddSuperheroData()

    const handleAddHeroClick = () => {
        const hero = {name, alterAgo}
        mutate(hero)
    }

    if (isLoading || isFetching) {
        return <h1 className={"w-[100vw] h-[100vh] flex justify-center items-center text-4xl"}>Loading...</h1>
    }

    if (isError) {
        return <h1
            className={"w-[100vw] h-[100vh] flex justify-center items-center text-4xl text-red-600"}>{error.message}</h1>
    }

    return (
        <div>
            <h2 className={"font-bold"}>SuperheroesPage:</h2>
            <div>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                <input type="text" value={alterAgo} onChange={e => setAlterAgo(e.target.value)}/>
                <button onClick={handleAddHeroClick}>Add hero</button>
            </div>
            <button
                className={"border rounded-md px-2 py-1 border-cyan-700 text-black hover:bg-cyan-800 active:bg-cyan-700"}
                onClick={refetch}>Fetch superheroes
            </button>
            {data?.data?.map((hero) => {
                return <div key={hero.id}>
                    <Link to={`/rq-super-heroes/${hero.id}`}>
                        {hero.name}
                    </Link>
                </div>
            })}
        </div>
    );
};

export default RqSuperheroesPage;
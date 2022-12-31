import {useQuery} from "react-query";
import {fetchSuperheroes} from "../components/RQSuperheroes.page";

export const useSuperheroesData = (onSuccess, onError) => {
    return useQuery(
        'super-heroes',
        fetchSuperheroes,
        {
            onSuccess,
            onError,
            // select: (data) => {
            //     return data.data.map(hero => hero.name)
            // }
        })
}
import {useMutation, useQuery, useQueryClient} from "react-query";
import {fetchSuperheroes} from "../components/RQSuperheroes.page";
import axios from "axios";

const fetchSuperheroe = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId) => {
    const queryClient = useQueryClient();
    return useQuery(['super-hero', heroId], () => fetchSuperheroe(heroId), {
        initialData: () => {
            const hero = queryClient.getQueryData('super-heroes')?.data?.find(hero => hero.id === parseInt(heroId))
            if (hero) {
                return {
                    data: hero
                }
            }
            return undefined
        }
    })

    // return useQuery(['super-hero', heroId], () => fetchSuperheroe(heroId))
};

const addSuperhero = (hero) => {
    return axios.post('http://localhost:4000/superheroes', hero)
}

export const useAddSuperheroData = () => {
    const queryClient = useQueryClient();
    return useMutation(addSuperhero, {
        // onSuccess: (data) => {
        //     // queryClient.invalidateQueries('super-heroes')
        //     queryClient.setQueriesData('super-heroes', (oldQueryData) => {
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data]
        //         }
        //     })
        // }
        onMutate: async (newHero) => {
            await queryClient.cancelQueries('super-heroes');
            const previousQueryData = queryClient.getQueryData('super-heroes');
            queryClient.setQueriesData('super-heroes', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        {id: oldQueryData?.data?.length + 1, ...newHero}
                    ]
                }
            });
            return {
                previousQueryData
            }
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueriesData('super-heroes', context.previousQueryData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes')
        }
    });
}


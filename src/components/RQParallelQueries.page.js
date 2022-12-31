import React from 'react';
import axios from "axios";
import {useQuery} from "react-query";

const RQParallelQueriesPage = () => {

    const fetchSuperHeroes = () => {
        return axios.get('https://localhost:4000/superheroes');
    }

    const fetchFriends = () => {
        return axios.get('https://localhost:4000/friends');
    }

    const {data: superHeroesData} = useQuery('super-heroes', fetchSuperHeroes);
    const {data: friendsData} = useQuery('friends', fetchFriends);

    return (
        <div>
            Parallel queries page
        </div>
    );
};

export default RQParallelQueriesPage;
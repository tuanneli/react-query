import React from 'react';
import axios from "axios";
import {useQuery} from "react-query";

const fetchUsers = (email) => {
    return axios.get(`https://localhost:4000/users/${email}`);
}

const fetchCourses = (channelId) => {
    return axios.get(`https://localhost:4000/channels/${channelId}`);
}

const DependentQueriesPage = ({email}) => {

    const {data: user} = useQuery(['user', email], fetchUsers);
    const channelId = user?.data.channelId;
    const {data: channel} = useQuery(['channel', channelId],
        fetchCourses,
        {
            enabled: !!channelId
        })


    return (
        <div>
            Dependent queries
        </div>
    );
};

export default DependentQueriesPage;
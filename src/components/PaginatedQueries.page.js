import React, {useState} from 'react';
import axios from "axios";
import {useQuery} from "react-query";

const fetchQueries = (pageNumber) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
}

const PaginatedQueriesPage = () => {

    const [pageNumber, setPageNumber] = useState(1);

    const {
        isLoading,
        data,
        isError,
        error,
        isFetching
    } = useQuery(['colors', pageNumber], () => fetchQueries(pageNumber));

    if (isLoading) {
        return <h1 className={"w-[100vw] h-[100vh] flex justify-center items-center text-4xl"}>Loading...</h1>
    }

    if (isError) {
        return <h1
            className={"w-[100vw] h-[100vh] flex justify-center items-center text-4xl text-red-600"}>{error.message}</h1>
    }

    return (
        <div>
            {data?.data.map(color =>
                <div key={color.id}>
                    {color.label}
                </div>
            )}
            <button onClick={() => setPageNumber(page => page - 1)} disabled={pageNumber === 1}>Prev page</button>
            <button onClick={() => setPageNumber(page => page + 1)} disabled={pageNumber === 4}>Next page</button>
            {isFetching && "Loading..."}
        </div>
    );
};

export default PaginatedQueriesPage;
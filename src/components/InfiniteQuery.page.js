import axios from "axios";
import {useInfiniteQuery} from "react-query";
import {Fragment} from "react";

const fetchQueries = ({pageNumber = 1}) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
}

const PaginatedQueriesPage = () => {

    const {
        isLoading,
        data,
        isError,
        error,
        hasNextPage,
        fetchNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery('colors',
        fetchQueries,
        {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < 4) {
                    return pages.length + 1
                }
                return undefined;
            }
        }
    );

    if (isLoading) {
        return <h1 className={"w-[100vw] h-[100vh] flex justify-center items-center text-4xl"}>Loading...</h1>
    }

    if (isError) {
        return <h1
            className={"w-[100vw] h-[100vh] flex justify-center items-center text-4xl text-red-600"}>{error.message}</h1>
    }

    return (
        <div>
            {data?.pages?.map((group, index) =>
                <Fragment key={index}>
                    {group.data.map(color =>
                        <div key={color.id}>
                            {color.label}
                        </div>
                    )}
                </Fragment>
            )}
            <div>
                <button disabled={!hasNextPage} onClick={fetchNextPage}>Load more</button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </div>
    );
};

export default PaginatedQueriesPage;
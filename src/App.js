import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import HomePage from "./components/Home.page";
import SuperheroesPage from "./components/Superheroes.page";
import RQSuperheroesPage from "./components/RQSuperheroes.page";
import {QueryClientProvider, QueryClient} from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";
import RQSuperheroePage from "./components/RQSuperheroe.page";
import RQParallelQueriesPage from "./components/RQParallelQueries.page";
import DynamicParallels from "./components/DynamicParallels";
import DependentQueriesPage from "./components/DependentQueries.page";
import PaginatedQueriesPage from "./components/PaginatedQueries.page";
import InfiniteQueryPage from "./components/InfiniteQuery.page";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <div className={"py-2 bg-gray-600 text-white"}>
                    <Link className={"mx-2 hover:text-amber-100"} to={'/'}>HOME</Link>
                    <Link className={"mx-2 hover:text-amber-100"} to={'/super-heroes'}>SUPER HEROES</Link>
                    <Link className={"mx-2 hover:text-amber-100"} to={'/rq-super-heroes'}>RQ SUPER HEROES</Link>
                </div>

                <Routes>
                    <Route path={'/infinite-queries'} element={<InfiniteQueryPage/>}/>
                    <Route path={'/paginated-queries'} element={<PaginatedQueriesPage/>}/>
                    <Route path={'/dependent-queries'} element={<DependentQueriesPage email={'email@gmail.com'}/>}/>
                    <Route path={'/rq-dynamic-parallel'} element={<DynamicParallels heroeIds={[1, 3]}/>}/>
                    <Route path={'/rq-parallel-queries'} element={<RQParallelQueriesPage/>}/>
                    <Route path={'/rq-super-heroes/:heroId'} element={<RQSuperheroePage/>}/>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/super-heroes'} element={<SuperheroesPage/>}/>
                    <Route path={'/rq-super-heroes'} element={<RQSuperheroesPage/>}/>
                </Routes>
            </div>
            <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'}/>
        </QueryClientProvider>
    );
}

export default App;

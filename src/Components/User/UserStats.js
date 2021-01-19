import React from 'react';
import Head from '../Interface/Head';
import useFetch from '../../Hooks/useFetch';
import { STATS_GET } from '../../Api';
import Loading from '../Interface/Loading';
import Error from '../Interface/Error';
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));


const UserStats = () => {   
    const { data, error, loading, request } = useFetch();

    React.useEffect(() => {
        async function getData() {
            const { url, options } = STATS_GET();
            await request(url, options);
        }
        getData();
    }, [request]);
  

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    if (data)
    return ( 
        <React.Suspense fallback={<div></div>}>
            <Head title="Statistics" />
            <UserStatsGraphs data={data} />
        </React.Suspense>
    );
    else return null;

};       

export default UserStats;    

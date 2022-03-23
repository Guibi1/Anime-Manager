import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Loading from "@components/Loading"
import Card from '@components/Card'


export default function Search()
{
    const router = useRouter()
    const [results, setResults] = useState([])
    const [fetching, setFetching] = useState(true)
    const [resultsToShow, setResultsToShow] = useState(10)
    useEffect(() => {
        setResultsToShow(10)
        setFetching(true)
        fetch(`https://api.aniapi.com/v1/anime?title=${router.query.title}&nsfw=true&with_episodes=false&per_page=100`)
            .then((res) => res.json())
            .then((json) => {
                setResults(json.data.documents)
                setFetching(false)
            })
    }, [router.query])


    if (!results)
    {
        return (
            <main>
                <p>Aucun résultat</p>
            </main>
        )
    }

    if (results.length == 1)
    {
        router.push(`/anime?id=${results[0].id}`)
        return null
    }

    return (
        <main>
            <div className="grid">
                {results.slice(0, resultsToShow).map((anime) =>
                    <Card anime={anime}/>
                )}
            </div>

            {fetching ?
                <Loading/>
            : (resultsToShow < results.length &&
                <button onClick={() => setResultsToShow(resultsToShow + 10)}>Voir plus de résultats</button>
            )}
        </main>
    )
}

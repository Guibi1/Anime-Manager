import { useEffect, useState } from "react"

import Loading from "@components/Loading"
import Card from '@components/Card'


export default function Home()
{
    const [animes, setAnimes] = useState([])
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("topAnimes"))
        if (storedData?.data?.documents)
            setAnimes(storedData.data.documents)

        else
        {
            console.log("Fetching top anime of the year.")
            fetch(`https://api.aniapi.com/v1/anime?year=${new Date().getFullYear()}&nsfw=false&with_episodes=false&per_page=6`)
                .then((res) => res.json())
                .then((json) => {
                    setAnimes(json.data.documents)
                    localStorage.setItem("topAnimes", JSON.stringify(json))
                })
        }
    }, [])

    return (
        <main>
            {animes ?
                <div className="grid">
                    {animes.map((anime) =>
                        <Card anime={anime} key={anime.id}/>
                        )}
                </div>
            :
                <div>
                    <Loading/>
                </div>
            }
        </main>
    )
}

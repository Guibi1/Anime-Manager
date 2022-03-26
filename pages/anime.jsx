import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import Loading from "@components/Loading"

import styles from "@styles/Anime.module.sass"


export default function Anime()
{
    const router = useRouter()
    const [coverImageLoaded, setCoverImageLoaded] = useState(false)
    const [bannerImageLoaded, setBannerImageLoaded] = useState(false)
    const [anime, setAnime] = useState()
    const [episodes, setEpisodes] = useState()

    useEffect(() => {
        if (!router.isReady)
            return

        else if (!router.query.id)
            router.push("/")
        
        else
        {
            fetch(`https://api.aniapi.com/v1/anime/${router.query.id}`)
                .then((res) => res.json())
                .then((json) => setAnime(json.data))

            fetch(`https://api.aniapi.com/v1/episode?anime_id=${router.query.id}&is_dub=false&locale=en`)
                .then((res) => res.json())
                .then((json) => setEpisodes(json.data.documents))
        }
    }, [router.isReady])


    if (!anime)
        return null

    return (
        <main className={styles.main}>
            <div className={styles.anime}>
                <div className={styles.cover}>
                    {(!coverImageLoaded || !anime.cover_image) && <Loading/>}
                    <Image src={anime.cover_image} onLoadingComplete={() => setCoverImageLoaded(true)} layout="fill"/>
                </div>

                <div className={styles.details}>
                    <h2 className={styles.title}>{anime.titles.en}</h2>
                    <p className={styles.japaneseTitle}>{anime.titles.rj}</p>

                    <ul className={styles.genres}>
                        {[...anime.genres].slice(0, 5).map((genre) => <li key={genre}>{genre}</li>)}
                    </ul>

                    <p className={styles.description} dangerouslySetInnerHTML={{ __html: anime.descriptions.en }}/>
                </div>
            </div>

            {episodes ?
                <div className={styles.episodes}>
                    <div className={styles.banner}>
                        {(!bannerImageLoaded || !anime.banner_image) && <Loading/>}
                        <Image src={anime.banner_image} onLoadingComplete={() => setBannerImageLoaded(true)} layout="fill"/>
                    </div>
                    {episodes.map((episode) => <Episode anime={anime.titles.rj} title={episode.title} number={episode.number}/>)}
                </div>
            :
                null
            }
        </main>
    )
}


function Episode({ anime, title, number })
{
    const router = useRouter()

    return (
        <div className={styles.episode}>
            <p className={styles.number}>#{number}</p>
            <p className={styles.title}>{title}</p>
            <a onClick={() => handleDownload(anime, number, router)} className={styles.download}>
                <svg viewBox="0 0 330 330">
                    <path d="M165,0C74.019,0,0,74.018,0,165c0,90.98,74.019,165,165,165s165-74.02,165-165C330,74.018,255.981,0,165,0z M165,300   c-74.439,0-135-60.561-135-135S90.561,30,165,30s135,60.561,135,135S239.439,300,165,300z"/>
                    <path d="M211.667,127.121l-31.669,31.666V75c0-8.285-6.716-15-15-15c-8.284,0-15,6.715-15,15v83.787l-31.665-31.666   c-5.857-5.857-15.355-5.857-21.213,0c-5.858,5.859-5.858,15.355,0,21.213l57.271,57.271c2.929,2.93,6.768,4.395,10.606,4.395   c3.838,0,7.678-1.465,10.607-4.393l57.275-57.271c5.857-5.857,5.858-15.355,0.001-21.215   C227.021,121.264,217.524,121.264,211.667,127.121z"/>
                    <path d="M195,240h-60c-8.284,0-15,6.715-15,15c0,8.283,6.716,15,15,15h60c8.284,0,15-6.717,15-15C210,246.715,203.284,240,195,240z"/>
                </svg>
            </a>
        </div>
    )
}


function handleDownload(anime, number, router)
{
    fetch(`/api/anime/${anime} — ${("0" + number).slice(-2)}`)
        .then((res) => res.text())
        .then((text) => router.push(text))
}

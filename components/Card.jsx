import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import Loading from "@components/Loading"

import styles from "@styles/Card.module.sass"


export default function Card({ anime })
{
    const router = useRouter()
    const [coverImageLoaded, setCoverImageLoaded] = useState(false)
    const handleClick = () => {
        router.push(`/anime?id=${anime.id}`)
    }

    if (!anime)
        return null

    return (
        <div className={styles.card}>
            <div className={styles.cover}>
                {(!coverImageLoaded || !anime.cover_image) && <Loading/>}
                <Image src={anime.cover_image} onLoadingComplete={() => setCoverImageLoaded(true)} layout="fill"/>
            </div>

            <div>
                <h2 className={styles.title}>{anime.titles.en}</h2>
                <p className={styles.japaneseTitle}>{anime.titles.rj}</p>

                <p className={styles.description}>{anime.descriptions.en.replace( /(<([^>]+)>)/ig, '').split(" ").slice(0, 20).join(" ") + "..."}</p>
                <button onClick={handleClick}>Voir plus</button>
            </div>
        </div>
    )
}

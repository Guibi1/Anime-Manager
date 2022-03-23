import { useRef, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import styles from "@styles/Navigation.module.sass"


export default function Navigation()
{
    const router = useRouter()
    const input = useRef()
    const [focused, setFocused] = useState(false)
    const [search, setSearch] = useState("")
    const handleSearchChange = ({ target }) => setSearch(target.value)
    const handleSearch = () => {
        if (search.length)
            router.push(`/search?title=${search}`)
    }

    return (
        <nav className={styles.navigation}>
            <Link href="/">
                <a href="/">
                    <h1 className={styles.title}>Anime Manager</h1>
                </a>
            </Link>

            <div onClick={() => input.current.focus()} className={focused ? `${styles.search} ${styles.expended}` : styles.search}>
                <div>
                    <input
                        style={{ "--width": `${(search.length || 8) + 1}ch` }}
                        placeholder="Chercher"
                        ref={input}
                        onChange={handleSearchChange}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onKeyPress={(target) => { if(target.key == "Enter") handleSearch() }}
                    />

                    <svg onClick={handleSearch} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                        <path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path>
                    </svg>
                </div>

                <span onClick={handleSearchChange}/>
            </div>

            <Link href="/downloads">
                <a>
                    <p>Téléchargements</p>
                </a>
            </Link>
        </nav>
    )
}

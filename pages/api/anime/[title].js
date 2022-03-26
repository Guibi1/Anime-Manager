export default async function handler(req, res)
{
    const rep = await fetch("https://subsplease.org/api/?f=search&tz=America/Toronto&s=" + req.query.title)
    const json = await rep.json()

    for (let element in json)
        for (let episode of json[element].downloads)
            if (episode.res == "1080")
                res.status(200).end(episode.magnet)

    res.status(400)
}

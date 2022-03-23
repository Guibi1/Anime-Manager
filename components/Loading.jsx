import { Rings } from "react-loader-spinner";


export default function Loading({ dark })
{
    return (
        <Rings color={dark ? "#352f44" : "#5C5470"}/>
    )
}

import { useEffect, useState } from "react";

export const getScreenWidth = () => {
    const [widthScreen,setWidthScreen] = useState(window.innerWidth);

    useEffect(() => {
        setWidthScreen(window.innerWidth);
    },[window.innerWidth])

    return widthScreen;
}
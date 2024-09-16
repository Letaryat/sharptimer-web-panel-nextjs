'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
const ChangeMap = () =>{
    const [map, setMap] = useState('surf_');
    const handle = (value) =>{
        setMap("surf_xd");

    }
    return(
        <div>
            <Button onClick={() => setMap("surf_xd")}>Surf</Button>
            <Button onClick={() => setMap("bh_")}>BH</Button>
            <Button onClick={() => setMap("kz_")}>KZ</Button>
            <Button onClick={() => setMap("%")}>Others</Button>
        </div>
    )
}



export default ChangeMap



import Image from "next/image";
export async function StateMapChecker(props){
    let map = await fetch(props.map);
    if(map.status == 404){
        return (
            <Image className="rounded-md object-none" layout="fill" src="https://rank.pierdolnik.eu/storage/cache/img/maps/730/-.jpg"/>
        )
    }else{
        return (
            <Image className="transition ease-in-out rounded-md object-none opacity-60 hover:opacity-70" layout="fill" src={map.url}/>
        )
    }

}
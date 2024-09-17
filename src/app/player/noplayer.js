import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon, HomeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function NoPlayer(){
    return(
        <div className="mx-auto items-center justify-center">
            <Alert className="w-[500px] mb-2 warning-gradient">
                <ExclamationTriangleIcon/>
                <AlertTitle>Warning!</AlertTitle>
                <AlertDescription>
                    We couldn't find anyone in database with that steamid! Either player does not exist or does not have any map records!
                </AlertDescription>
            </Alert>
            <Link href="/player">
                <Button variant="secondary" className=" text-white " > 
                    <HomeIcon className="mr-1" /> Back to leaderboard
                </Button>
            </Link>

        </div>
    )


}
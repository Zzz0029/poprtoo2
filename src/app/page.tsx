import { getDbData } from "@/lib/db";
import HomeClient from "./HomeClient";

export default async function Page() {
    const db = await getDbData();

    // Pass everything down to our client wrapper which handles Lenis & animations
    return <HomeClient dbData={db} />;
}

import { getDbData } from "@/lib/db";
import HallOfFameClient from "./HallOfFameClient";

export default async function Page() {
    const db = await getDbData();
    return <HallOfFameClient dbData={db} />;
}

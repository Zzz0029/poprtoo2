import { getDbData } from "@/lib/db";
import AboutClient from "./AboutClient";

export default async function Page() {
    const db = await getDbData();
    return <AboutClient dbData={db} />;
}

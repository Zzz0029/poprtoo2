import { getDbData } from "@/lib/db";
import ServicesClient from "./ServicesClient";

export default async function Page() {
    const db = await getDbData();
    return <ServicesClient dbData={db} />;
}

import { getDbData } from "@/lib/db";
import ContactClient from "./ContactClient";

export default async function Page() {
    const db = await getDbData();
    return <ContactClient dbData={db} />;
}

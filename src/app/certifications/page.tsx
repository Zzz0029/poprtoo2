import { getDbData } from "@/lib/db";
import CertificationsClient from "./CertificationsClient";

export default async function Page() {
    const db = await getDbData();
    return <CertificationsClient dbData={db} />;
}

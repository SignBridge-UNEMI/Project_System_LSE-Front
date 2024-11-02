import { CustomIcon } from "@/components/Customicon"

import {List, Table} from "lucide-react"
import { TableIntegrations } from "../TableIntegrations"


export function ListIntegrations() {
    return (
    <div className="shadow-md bg-[#acc3f018] rounded-lg p-5 flex-1">
        <div className="flex gap-x-2 items-center">
            <CustomIcon icon={List} />
            <p className="text-xl">List Integrations</p>
        </div>
        <TableIntegrations/>
    </div>
    )
}

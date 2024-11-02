import Link from "next/link";
import { CustomIcon } from "@/components/Customicon";
import { CardSummaryProps } from "./CardSummary.types";
import { CustomTooltip } from "@/components/CustomTooltip";

export function CardSummary(props: CardSummaryProps) {
    const { icon: Icon, title, tooltipText, descip, href } = props;

    const content = (
        <div className="shadow-sm bg-[#acc3f018] rounded-lg p-5 py-3 hover:shadow-lg transition">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <CustomIcon icon={Icon} />
                    {title}
                </div>
                <CustomTooltip content={tooltipText} />
            </div>
            <div className="flex gap-4 mt-2 md:mt-4">
                <p className="text-2xl">{descip}</p>
            </div>
        </div>
    );

    return href ? (
        <Link href={href} passHref>
            <a className="block">{content}</a>
        </Link>
    ) : (
        content
    );
}

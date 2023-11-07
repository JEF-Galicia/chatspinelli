import { ExternalLink } from "@/components/external-link";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";
import Link from "next/link";

export default async function DigitalRightsPage() {
    return (
        <div className="flex min-h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10 flex-col gap-8">
            <div className="mx-auto max-w-2xl px-4">
                <div className="rounded-lg border bg-background p-8">
                    <h1 className="mb-6 text-lg font-semibold">
                        Digital Rights: What are they?
                    </h1>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        <span className="font-semibold text-foreground">Digital rights are the rights that we have in the digital world.</span>
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        They protect our privacy, freedom of speech, and fair access to technology. In our digital world, they ensure our personal info stays safe, let us speak our minds, and make sure everyone&apos;s treated equally online.
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        The European Union tries to protect these rights. It does this through laws like the General Data Protection Regulation <ExternalLink href="https://gdpr.eu/what-is-gdpr/">(GDPR)</ExternalLink> and the <ExternalLink href="https://commission.europa.eu/aid-development-cooperation-fundamental-rights/your-rights-eu/eu-charter-fundamental-rights/why-do-we-need-charter_en">Charter of Fundamental Rights</ExternalLink> of the European Union.
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        However, these laws are complicated. It&apos;s hard to know what they mean and how they protect us. But it&apos;s essential that we understand them to protect our rights.
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        <span className="font-semibold text-foreground">We&apos;ve built ChatMadariaga to help you understand your digital rights.</span> You can ask him about how the EU protects your rights, what they are, and how you can use them.
                    </p>
                    <Link className="mt-4 flex flex-col items-start space-y-2" href="/?initialMessage=What%20is%20the%20EU%20doing%20to%20protect%20my%20digital%20rights%3F">
                        <Button
                            variant="link"
                            className="h-auto p-0 text-base text-left"
                        >
                            <IconArrowRight className="mr-2 text-muted-foreground" />
                            Ask ChatMadariaga about your digital rights
                        </Button>
                    </Link>
                    <Link className="mt-4 flex flex-col items-start space-y-2" href="https://yourdigitalrights.eu">
                        <Button
                            variant="link"
                            className="h-auto p-0 text-base text-left"
                        >
                            <IconArrowRight className="mr-2 text-muted-foreground" />
                            Learn more at yourdigitalrights.eu
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


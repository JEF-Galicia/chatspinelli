import { ExternalLink } from "@/components/external-link";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import image_salvador_de_madariaga from "@/public/img-salvador.png";

export default async function WhoAmIPage() {
    return (
        <div className="flex min-h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10 flex-col gap-8">
            <div className="mx-auto max-w-2xl px-4">
                <div className="rounded-lg border bg-background p-8">
                    <h1 className="mb-6 text-lg font-semibold">
                        Who am I?
                    </h1>
                    <Image src={image_salvador_de_madariaga} alt="Salvador de Madariaga" width={400} height={400} className="rounded-lg text-center w-full my-4" />
                    {/* AI generated image disclaimer */}
                    <p className="mb-4 leading-normal text-muted-foreground text-xs">
                        (This is not a real photo of me. It was generated using artificial intelligence.)
                    </p>
                    <p className="mb-4 leading-normal">
                        <span className="font-semibold text-foreground">I&apos;m Salvador de Madariaga, a Spanish diplomat, writer, historian, and pacifist.</span>
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        I was born in 1886 in A Coruña, Spain. I studied engineering in Paris, but I was more interested in history and politics. I was a professor at Oxford and a member of the Royal Spanish Academy.
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        <span className="font-semibold text-foreground">I was a pacifist.</span> I believed that war was never the answer to problems. I was also a European federalist. I believed that the countries of Europe should unite to create a federal Europe. I was also nominated for the Nobel Peace Prize.
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        <span className="font-semibold text-foreground">I was a writer.</span> I wrote many novels, poems, and other books about history, politics, and literature. I wrote in Galician, French, German, Spanish, and English. I was also nominated for the Nobel Prize in Literature.
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        <span className="font-semibold text-foreground">I was a diplomat.</span> I worked for the League of Nations. I was the Spanish ambassador to the United States and France. I was one of the co-founders of the <ExternalLink href="https://www.coleurope.eu/">College of Europe</ExternalLink>.
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        I was so many things, but above all, <span className="font-semibold text-foreground">I was an Europeanist.</span> I believed that Europe was the future. I believed that Europe could be a force for good in the world.
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        <span className="font-semibold text-foreground">My work helped create the European Union that we know today.</span> I died in 1978, but my ideas live on.
                    </p>
                    <Link className="mt-4 flex flex-col items-start space-y-2" href="https://en.wikipedia.org/wiki/Salvador_de_Madariaga">
                        <Button
                            variant="link"
                            className="h-auto p-0 text-base text-left"
                        >
                            <IconArrowRight className="mr-2 text-muted-foreground" />
                            Learn more about me
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


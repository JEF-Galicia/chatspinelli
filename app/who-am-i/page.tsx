import { ExternalLink } from "@/components/external-link";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import image_spinelli from "@/public/img-spinelli.png";

export default async function WhoAmIPage() {
    return (
        <div className="flex min-h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10 flex-col gap-8">
            <div className="mx-auto max-w-2xl px-4">
                <div className="rounded-lg border bg-background p-8">
                    <h1 className="mb-6 text-lg font-semibold">
                        Who am I?
                    </h1>
                    <Image src={image_spinelli} alt="Altiero Spinelli" width={400} height={400} className="rounded-lg text-center w-full my-4" />
                    {/* AI generated image disclaimer */}
                    <p className="mb-4 leading-normal text-muted-foreground text-xs">
                        (This is not a real photo of me. It was generated using artificial intelligence.)
                    </p>
                    <p className="mb-4 leading-normal">
                        <span className="font-semibold text-foreground">I&apos;m Altiero Spinelli, an Italian communist turned federalist who dedicated my life to the idea of a democratic, federal Europe.</span>
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        I&apos;ve been built by{' '}
                        <ExternalLink href="https://jef.gal/projects/chatspinelli@projects.jef.gal">JEF Galicia</ExternalLink> and funded by the{' '}
                        <ExternalLink href="https://yourdigitalrights.eu/">
                            Erasmus+ DIRECT project
                        </ExternalLink>
                        .
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        

                        I was born in 1907 in Rome. As a young man, I joined the Italian Communist Party, but I grew disillusioned with communism after being imprisoned by the fascist government in 1927 for 16 years. During my time in prison, I renounced communism and began developing my vision for a federal Europe.

                        In 1941, while still in prison on the island of Ventotene, I co-wrote the Ventotene Manifesto calling for a free and united Europe to prevent future wars. The manifesto expressed my belief that European nation-states were responsible for the nationalism and militarism that led to war. I believed that only a federally unified Europe could guarantee lasting peace.

                        After the war, I co-founded the European Federalist Movement in 1943 and the Union of European Federalists in 1946 to promote the idea of a European federation. I criticized the European Coal and Steel Community in the 1950s as too technocratic and lacking democratic legitimacy and popular participation.

                        I served as a European Commissioner from 1970-1976 where I developed pragmatic approaches, but my true passion remained building a democratic European federation. As an elected Member of the European Parliament from 1976 until my death in 1986, I led the charge to draft a Treaty on European Union to create a more federal structure. My efforts laid the groundwork for reforms like the Single European Act and Treaty of Maastricht.

                        Though I passed in 1986, before seeing many of my ideas come to fruition, I devoted my entire life since Ventotene to the vision of a democratic United States of Europe. I was and remain today a pioneer of European federalism. My body is buried on Ventotene, returning to that small island where my European dream was born.
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
                    <Link className="mt-4 flex flex-col items-start space-y-2" href="https://en.wikipedia.org/wiki/Altiero_Spinelli">
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


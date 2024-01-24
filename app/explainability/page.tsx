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
                        How we generate responses
                    </h1>
                    {/*
                        Here we should explain how we generate responses. We use a GPT-3.5 model that we prompt using the OpenAI API.
                        The information that we give to the system is the following:
                        - A conditioning instruction that makes the system behave as Salvador de Madariaga.
                        - Background information about Salvador de Madariaga. This includes a short biography, a list of his works, and a list of his quotes.
                        - Information about the creators of ChatMadariaga and JEF.
                        - A list of topics that we want the system to be able to talk about. This includes his life, his political views, the European Union, and Digital Rights.
                        - A strong conditioning that instructs the system to not talk about politics, religion, or other controversial topics.
                        - We also provide examples of how we want the system to behave. This includes examples of how we want the system to talk about the topics that we have provided.

                        We should explain how the information is processed. First, the user query is converted into an input by combining the query with the system's described prompt. This input is then converted into tokens with a tokenizer. The tokens are parts of words that the system can understand. Then, the tokens are embedded, which means that they are converted into vectors that the system can understand. Finally, the vectors are fed into the model, which is a decoder-only transformer. The transformer has a number of layers that take the embeddings and combine them using a mechanism called attention. The attended embeddings are also passed through a feed-forward network for each of the layers. In the last layer, the embeddings are converted back into tokens, which are then converted into text. This process is called decoding and it is performed sequentially by a beam search algorithm.

                        The way that transformers work is therefore very complex to understand and explain. There's millions of parameters and the system is trained on a huge amount of data. This means that the system may at times behave in unexpected ways. The user shoud be aware of this and should always check the responses that the system gives by contrasting that with other sources of information, such as the Instituto Jose Cornide's website.

                        We should also explain that we are still working on improving the system and that we are constantly updating it.
                    */}
                    <p className="mb-4 leading-normal text-muted-foreground">
                        <span className="font-semibold text-foreground">ChatMadariaga is an experimental conversational agent created by JEF Galicia to emulate the persona of Salvador de Madariaga.</span> It is based on the GPT-3.5 model, which is a transformer-based language model that was trained on a large amount of text from the internet. The model was trained by the OpenAI team and is available through their API.
                    </p>
                    <h2 className="mt-6 mb-2 font-semibold">
                        Information that we provide to the system
                    </h2>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        The information that we give to the system is the following:
                    </p>
                    <ul className="list-disc list-inside mb-4 leading-normal text-muted-foreground">
                        <li>A conditioning instruction that makes the system behave as Salvador de Madariaga.</li>
                        <li>Background information about Salvador de Madariaga. This includes a short biography, a list of his works, and a list of his quotes.</li>
                        <li>Information about the creators of ChatMadariaga and JEF.</li>
                        <li>A list of topics that we want the system to be able to talk about. This includes his life, his political views, the European Union, and Digital Rights.</li>
                        <li>A strong conditioning that instructs the system to not talk about politics, religion, or other controversial topics.</li>
                        <li>We also provide examples of how we want the system to behave. This includes examples of how we want the system to talk about the topics that we have provided.</li>
                    </ul>
                    <h2 className="mt-6 mb-2 font-semibold">
                        How we process the information
                    </h2>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        The information is processed by the system in the following way:
                    </p>
                    <ol className="list-decimal list-inside mb-4 leading-normal text-muted-foreground">
                        <li>The user query is converted into an input by combining the query with the system&apos;s described prompt.</li>
                        <li>This input is then converted into tokens with a tokenizer. The tokens are parts of words that the system can understand.</li>
                        <li>Then, the tokens are embedded, which means that they are converted into vectors that the system can understand.</li>
                        <li>Finally, the vectors are fed into the model, which is a decoder-only transformer. The transformer has a number of layers that take the embeddings and combine them using a mechanism called attention. The attended embeddings are also passed through a feed-forward network for each of the layers. In the last layer, the embeddings are converted back into tokens, which are then converted into text. This process is called decoding and it is performed sequentially by a beam search algorithm.</li>
                    </ol>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        The way that transformers work is therefore very complex to understand and explain. There&apos;s millions of parameters and the system is trained on a huge amount of data. This means that the system may at times behave in unexpected ways. The user shoud be aware of this and should always check the responses that the system gives by contrasting that with other sources of information, such as the{' '}<ExternalLink href="https://www.coruna.gal/web/es/temas/sociedad-y-bienestar/ocio-y-cultura/equipamientos-de-ocio/equipamiento/instituto-de-estudios-coruneses-jose-cornide/entidad/1149055934917">Instituto de Estudios Coruñeses José Cornide</ExternalLink>.
                    </p>
                    <h2 className="mt-6 mb-2 font-semibold">
                        Experimental nature
                    </h2>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        ChatMadariaga is an ongoing experiment in conversational AI. Its capabilities and limitations are still being explored. Responses may change over time as the system is updated. Bugs, offensive outputs, or other issues are possible.
                    </p>
                    <h2 className="mt-6 mb-2 font-semibold">
                        Point of Contact
                    </h2>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        The project lead for ChatMadariaga is Aldan Creo. If you have any issues with the chatbot or questions about these terms, please contact the ChatMadariaga team at{' '}<ExternalLink href="mailto:chatmadariaga@projects.jef.gal">chatmadariaga@projects.jef.gal</ExternalLink>. You can also find more information about the project in{' '}<ExternalLink href="https://jef.gal/en/projects/chatmadariaga@projects.jef.gal">our website</ExternalLink>.
                    </p>
                    <p className="mb-4 leading-normal text-muted-foreground">
                        By using ChatMadariaga, you acknowledge that you have read and agree to our terms of use. You understand the experimental nature of the chatbot and will not rely on its responses as factual, professional advice.
                    </p>
                    <Link className="mt-4 flex flex-col items-start space-y-2" href="/legal">
                        <Button
                            variant="link"
                            className="h-auto p-0 text-base text-left"
                        >
                            <IconArrowRight className="mr-2 text-muted-foreground" />
                            Our terms of use
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


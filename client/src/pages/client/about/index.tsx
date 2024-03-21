import hero from '@/assets/hero2.png';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import twitter from '@/assets/social-media-1.png';
import facebook from '@/assets/social-media-2.png';

const About = () => {
    return (
        <div>
            <div className="w-full flex p-5">
                <div className="w-1/2 h-1/2 flex flex-col items-center justify-center p-5">
                    <h1 className="text-7xl mb-10">ABOUT US</h1>
                    <div className="h-1/2 flex flex-col gap-5">
                        <h1 className="text-5xl">
                            What is <span className="text-primary">iSelect</span> ?
                        </h1>
                        <p className="text-2xl">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, eum?
                            Ea aperiam repellendus assumenda voluptatum dolor, eos maxime voluptate
                            minima?
                        </p>
                        <Accordion type="multiple" className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-xl">Our mission</AccordionTrigger>
                                <AccordionContent className="text-xl">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                    Possimus nesciunt dolor laborum blanditiis pariatur consequatur
                                    laboriosam sapiente provident suscipit in.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-xl">Our Vision</AccordionTrigger>
                                <AccordionContent className="text-xl">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                    Possimus nesciunt dolor laborum blanditiis pariatur consequatur
                                    laboriosam sapiente provident suscipit in.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className="w-1/2">
                    <img src={hero} alt="hero" />
                </div>
            </div>
            <div className="p-10 flex">
                <div>
                    <h1 className="text-5xl">Our Team</h1>
                    <p className="text-2xl">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus,
                        officia.
                    </p>
                </div>
                <div className="w-1/2 flex flex-wrap gap-28">
                    <div className="flex gap-5">
                        <div className="w-48 h-48 rounded-full overflow-hidden">
                            <img
                                src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="CEO"
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-5">
                            <div>
                                <p className="text-xl font-semibold text-primary">
                                    JOEVENEL EURANGO JR.
                                </p>
                                <p className="text-xl font-semibold">CEO</p>
                            </div>
                            <div>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad dolorem
                                voluptatibus nisi pariatur aspernatur voluptates, natus quibusdam
                                iure deleniti reiciendis.
                            </div>
                            <div className="flex gap-5">
                                <div className="flex justify-center items-center gap-1">
                                    <div className="w-5 h-5">
                                        <img src={twitter} alt="CEO" />
                                    </div>
                                    <a
                                        href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        @joevenel
                                    </a>
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    <div className="w-5 h-5">
                                        <img src={facebook} alt="CEO" />
                                    </div>
                                    <a
                                        href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        @joevenel
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="w-48 h-48 rounded-full overflow-hidden">
                            <img
                                src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="CEO"
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-5">
                            <div>
                                <p className="text-xl font-semibold text-primary">
                                    EDMAR DE GUZMAN
                                </p>
                                <p className="text-xl font-semibold">COO</p>
                            </div>
                            <div>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad dolorem
                                voluptatibus nisi pariatur aspernatur voluptates, natus quibusdam
                                iure deleniti reiciendis.
                            </div>
                            <div className="flex gap-5">
                                <div className="flex justify-center items-center gap-1">
                                    <div className="w-5 h-5">
                                        <img src={twitter} alt="CEO" />
                                    </div>
                                    <a
                                        href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        @joevenel
                                    </a>
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    <div className="w-5 h-5">
                                        <img src={facebook} alt="CEO" />
                                    </div>
                                    <a
                                        href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        @joevenel
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="w-48 h-48 rounded-full overflow-hidden">
                            <img
                                src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="CEO"
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-5">
                            <div>
                                <p className="text-xl font-semibold text-primary">BIEN AGUIRE</p>
                                <p className="text-xl font-semibold">VP OF FINANCE</p>
                            </div>
                            <div>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad dolorem
                                voluptatibus nisi pariatur aspernatur voluptates, natus quibusdam
                                iure deleniti reiciendis.
                            </div>
                            <div className="flex gap-5">
                                <div className="flex justify-center items-center gap-1">
                                    <div className="w-5 h-5">
                                        <img src={twitter} alt="CEO" />
                                    </div>
                                    <a
                                        href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        @joevenel
                                    </a>
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    <div className="w-5 h-5">
                                        <img src={facebook} alt="CEO" />
                                    </div>
                                    <a
                                        href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        @joevenel
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

import hero from '@/assets/hero2.png';
import logo from '@/assets/favicon.png';
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
                            iSelect is dedicated to revolutionizing student engagement through its
                            mission of empowering students with a secure, convenient, and inclusive
                            online voting platform, fostering democratic participation within
                            educational institutions. Join us to empower your voice and choose the
                            best candidates for a brighter tomorrow.
                        </p>
                        <Accordion type="multiple" className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-xl text-primary">
                                    Our mission
                                </AccordionTrigger>
                                <AccordionContent className="text-xl">
                                    To empower students with a secure, convenient, and inclusive
                                    online voting platform, fostering democratic participation and
                                    engagement within educational institutions.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-xl text-primary">
                                    Our Vision
                                </AccordionTrigger>
                                <AccordionContent className="text-xl">
                                    We envision a future where every student has equal access to
                                    participate in the democratic process, shaping their educational
                                    environment through transparent, efficient, and technologically
                                    advanced online voting systems.
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
                    <div>
                        <h1 className="text-5xl">Our Team</h1>
                        <p className="text-2xl">
                            Introducing Our Powerhouse Developers: Crafting Innovation, Building
                            Tomorrow's Solutions.
                        </p>
                    </div>
                    <div className="h-full flex justify-center items-center blur-xl">
                        <img className="w-full" src={logo} alt="" />
                    </div>
                </div>
                <div className="w-1/2 flex flex-wrap gap-28">
                    <div className="flex gap-5 items-center">
                        <div className="w-48 h-48 rounded-full overflow-hidden">
                            <img
                                src="https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-6/404478375_3569585926586555_6396988765399474011_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHmnGa7HX3QVIF865RUR1mZVtNFQliobFJW00VCWKhsUkDbhYm8_BoKIQzILT7w3AxAN_J7IgqTPk_-zHF_Z0eV&_nc_ohc=29z3QkZ92d4Ab48t2Ze&_nc_ht=scontent.fmnl4-4.fna&oh=00_AfCwz9tRaLJ9c2771DqNuwPt9e2JXNst-0vo5VG6tRSI5Q&oe=6626B425"
                                alt="JOEVENEL EURANGO JR."
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-5">
                            <div>
                                <p className="text-xl font-semibold text-primary">
                                    JOEVENEL EURANGO JR.
                                </p>
                            </div>
                            {/* <div>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad dolorem
                                voluptatibus nisi pariatur aspernatur voluptates, natus quibusdam
                                iure deleniti reiciendis.
                            </div> */}
                            <div className="flex gap-5">
                                {/* <div className="flex justify-center items-center gap-1">
                                    <div className="w-5 h-5">
                                        <img src={twitter} alt="CEO" />
                                    </div>
                                    <a
                                        href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        @joevenel
                                    </a>
                                </div> */}
                                <div className="flex justify-center items-center gap-1">
                                    <div className="w-5 h-5">
                                        <img src={facebook} alt="CEO" />
                                    </div>
                                    <a
                                        href="https://www.facebook.com/imjoevenel"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        @imjoevenel
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 items-center">
                        <div className="w-48 h-48 rounded-full overflow-hidden">
                            <img
                                src="https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/355911602_3418695875112108_5426195540496468157_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeH98fKCFeO9sZnbnVwsXBsQcYS-rtzOw3NxhL6u3M7Dc_xRpBW7EiiA7d7W0_sHppYaVI9C5BaxqaeJle2r6sGs&_nc_ohc=icdsbl0QBHkAb4zndR5&_nc_ht=scontent.fmnl17-3.fna&oh=00_AfBGn0aZvQeVmJmHrBjmwLBfD7TNpfPyV6z8HpXwCBsZZQ&oe=6626BA49"
                                alt="EDMAR DE GUZMAN"
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-5">
                            <div>
                                <p className="text-xl font-semibold text-primary">
                                    EDMAR DE GUZMAN
                                </p>
                            </div>
                            {/* <div>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad dolorem
                                voluptatibus nisi pariatur aspernatur voluptates, natus quibusdam
                                iure deleniti reiciendis.
                            </div> */}
                            <div className="flex gap-5">
                                <div className="flex justify-center items-center gap-1">
                                    <div className="w-5 h-5">
                                        <img src={facebook} alt="CEO" />
                                    </div>
                                    <a
                                        href="https://www.facebook.com/profile.php?id=100009151877659"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        @ed_dgzmnn
                                    </a>
                                </div>
                                {/* <div className="flex justify-center items-center gap-1">
                                    <div className="w-5 h-5">
                                        <img src={facebook} alt="CEO" />
                                    </div>
                                    <a
                                        href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        @joevenel
                                    </a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 items-center">
                        <div className="rounded-full overflow-hidden">
                            <img
                                src="https://scontent.xx.fbcdn.net/v/t1.15752-9/436658264_453565067207352_4934201058522224566_n.jpg?stp=dst-jpg_p228x119&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHFFIAzds4g38NfDa4mgdDIxdUK_ePrBwLF1Qr94-sHAs8KXWjAa4jLQgiYbFvqtA-2jkxAouwnwGlEIeArIz4h&_nc_ohc=F2YVcUVzGM0Ab6pleEH&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QE_muP-gfRrJM9IRjAqOmGF_67dTL5vAIlQ3e0e6IFwoQ&oe=6648770F"
                                alt="BIEN AGUIRE"
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-5">
                            <div>
                                <p className="text-xl font-semibold text-primary">
                                    BIEN JANSSEN C. AGUIRRE
                                </p>
                            </div>
                            {/* <div>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad dolorem
                                voluptatibus nisi pariatur aspernatur voluptates, natus quibusdam
                                iure deleniti reiciendis.
                            </div> */}
                            <div className="flex gap-5">
                                {/* <div className="flex justify-center items-center gap-1">
                                    <div className="w-5 h-5">
                                        <img src={twitter} alt="CEO" />
                                    </div>
                                    <a
                                        href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        @joevenel
                                    </a>
                                </div> */}
                                <div className="flex justify-center items-center gap-1">
                                    <div className="w-5 h-5">
                                        <img src={facebook} alt="CEO" />
                                    </div>
                                    <a
                                        href="https://www.facebook.com/Bienjanssen7"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        @Bienjanssen7
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

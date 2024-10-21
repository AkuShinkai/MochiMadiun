import useCustomJS from "../useCostumeJS";

function Promo() {
    useCustomJS();
    return (
        <section id="promo" className="py-16">
            <div className="container">
                <h2 className="section__title text-center">Hot Promo</h2>
                <div className="separator mx-auto"></div>

                <div className="flex flex-col gap-5 lg:gap-10 lg:flex-row">

                    <div
                        className="promo__card-1 bg-primaryColorLight dark:bg-darkColorLight flex flex-col p-5 rounded-lg md:flex-row md:items-center lg:flex-row-reverse lg:flex-1 font-bold">
                        <img src="/src/assets/github-mark-white.png" alt="promo image" className="w-40 mx-auto hover:animate-movingY md:mx-5" />

                        <div className="space-y-2 pt-5 md:pt-0">
                            <p className="text-xs text-secondaryColor">Berita Hari Ini</p>
                            <h3 className="card__title uppercase">penggunaan github dalam dunia pemrogramman</h3>
                            <p className="paragraph">Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.</p>
                            <a href="#" className="text-xs text-secondaryColor">Read More</a>
                        </div>
                    </div>

                    <div
                        className="promo__card-2 bg-primaryColorLight dark:bg-darkColorLight flex flex-col p-5 rounded-lg md:flex-row md:items-center lg:flex-row-reverse lg:flex-1 font-bold">
                        <img src="/src/assets/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg" alt="promo image"
                            className="w-40 mx-auto hover:animate-movingY md:mx-5" />

                        <div className="space-y-2 pt-5 md:pt-0">
                            <p className="text-xs text-secondaryColor">Berita Hari Ini</p>
                            <h3 className="card__title uppercase">penggunaan tailwind css yang membantu dalam pembuatan sebuah website</h3>
                            <p className="paragraph">Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.</p>
                            <a href="#" className="text-xs text-secondaryColor">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Promo;

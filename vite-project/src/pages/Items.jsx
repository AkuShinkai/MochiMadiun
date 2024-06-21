import useCustomJS from "../useCostumeJS";

const Items = () => {
    useCustomJS();
    return (
        <section id="more">
            <div className="container">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="section__title">Rekomendasi Berita Hari ini</h2>
                    <div className="separator mx-auto"></div>

                    <div className="tabs_wrap">
                        <ul className="flex flex-wrap justify-center gap-2 py-10">
                            <li data-tabs="all" className="btn bg-primaryColorLight dark:bg-darkColorLight active">All</li>
                            <li data-tabs="teknologi" className="btn bg-primaryColorLight dark:bg-darkColorLight">Teknologi</li>
                            <li data-tabs="sosial" className="btn bg-primaryColorLight dark:bg-darkColorLight">Sosial</li>
                            <li data-tabs="ekonomi" className="btn bg-primaryColorLight dark:bg-darkColorLight">Ekonomi</li>
                            <li data-tabs="pendidikan" className="btn bg-primaryColorLight dark:bg-darkColorLight">Pendidikan</li>
                            <li data-tabs="politik" className="btn bg-primaryColorLight dark:bg-darkColorLight">Politik</li>
                        </ul>
                    </div>
                </div>

                <div className="menu__items">
                    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">

                        {/* <!-- teknologi --> */}
                        <li className="item_wrap teknologi">
                            <a href="#more"
                                className="h-56 grid place-items-center bg-primaryColorLight dark:bg-darkColorLight dark:hover:bg-secondaryColor rounded-3xl hover:bg-secondaryColor ease-linear duration-200 lg:h-40">
                                <img src="img/klipartz.com (1).png" alt="teknologi"
                                    className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24" />
                            </a>
                            <div className="pt-5">
                                <div className="mb-2">
                                    <h4 className="card__title uppercase">saat ini teknologi ai semakin berkembang pesat</h4>
                                    <p className="paragraph">Sekarang ini teknologi AI kian berkembang pesat. Akankah hal ini menjadi
                                        keuntungan atau malah menjadi bencana?</p>
                                </div>
                                <a href="#more" className="text-secondaryColor">Read More</a>
                            </div>
                        </li>

                        {/* <!-- ekonomi --> */}
                        <li className="item_wrap ekonomi">
                            <a href="#more"
                                className="h-56 grid place-items-center bg-primaryColorLight dark:bg-darkColorLight dark:hover:bg-secondaryColor rounded-3xl hover:bg-secondaryColor ease-linear duration-200 lg:h-40">
                                <img src="img/ekonomi.png" alt="ekonomi"
                                    className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24" />
                            </a>
                            <div className="pt-5">
                                <div className="mb-2">
                                    <h4 className="card__title uppercase">kemiskinan kian bertambah. akankah ada jalan keluar?</h4>
                                    <p className="paragraph">Indonesia negara kita tercinta. Memiliki masalah yang sama setiap tahunnya yaitu
                                        kemiskinan. akankah ada cara mengatasinya?</p>
                                </div>
                                <a href="#more" className="text-secondaryColor">Read More</a>
                            </div>
                        </li>
                        {/*
            <!-- sosial --> */}
                        <li className="item_wrap sosial">
                            <a href="#more"
                                className="h-56 grid place-items-center bg-primaryColorLight dark:bg-darkColorLight dark:hover:bg-secondaryColor rounded-3xl hover:bg-secondaryColor ease-linear duration-200 lg:h-40">
                                <img src="img/sosial.png" alt="sosial"
                                    className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24" />
                            </a>
                            <div className="pt-5">
                                <div className="mb-2">
                                    <h4 className="card__title uppercase">kesenjangan sosial kian memburuk pada saat pandemi</h4>
                                    <p className="paragraph">Sosial Rakyat Indonesia kian memburuk semenjak pandemi kemarin.
                                        Akankah Pemerintah memiliki solusi untuk masalah ini?</p>
                                </div>
                                <a href="#more" className="text-secondaryColor">Read More</a>
                            </div>
                        </li>

                        {/* <!-- pendidikan --> */}
                        <li className="item_wrap pendidikan">
                            <a href="#more"
                                className="h-56 grid place-items-center bg-primaryColorLight dark:bg-darkColorLight dark:hover:bg-secondaryColor rounded-3xl hover:bg-secondaryColor ease-linear duration-200 lg:h-40">
                                <img src="img/pendidikan.png" alt="pendidikan"
                                    className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24" />
                            </a>
                            <div className="pt-5">
                                <div className="mb-2">
                                    <h4 className="card__title uppercase">pendidikan negara ini membutuhkan perubahan?</h4>
                                    <p className="paragraph">Sosial Rakyat Indonesia kian memburuk semenjak pandemi kemarin.
                                        Akankah Pemerintah memiliki solusi untuk masalah ini?</p>
                                </div>
                                <a href="#more" className="text-secondaryColor">Read More</a>
                            </div>
                        </li>

                        {/* <!-- politik --> */}
                        <li className="item_wrap politik">
                            <a href="#more"
                                className="h-56 grid place-items-center bg-primaryColorLight dark:bg-darkColorLight dark:hover:bg-secondaryColor rounded-3xl hover:bg-secondaryColor ease-linear duration-200 lg:h-40">
                                <img src="img/klipartz.com (3).png" alt="politik"
                                    className="w-40 hover:scale-110 ease-linear duration-200 md:w-48 lg:w-24" />
                            </a>
                            <div className="pt-5">
                                <div className="mb-2">
                                    <h4 className="card__title uppercase">tiap kubu makin memanas menjelang pilpres 2024</h4>
                                    <p className="paragraph">Menjelang pilpres 2024, kubu dari tiap presiden makin memanas dikarenakan debat kemarin</p>
                                </div>
                                <a href="#more" className="text-secondaryColor">Read More</a>
                            </div>

                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Items;

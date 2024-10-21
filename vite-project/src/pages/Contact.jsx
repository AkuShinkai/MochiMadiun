import React from "react";
import useCustomJS from "../useCostumeJS";

function Contact() {
    useCustomJS();
    return (
        <div className="w-full items-center overflow-hidden">
            <section id="contact" className="bg-secondaryColor py-16 w-full">
                <div className="container flex flex-col gap-5 md:items-center md:flex-row">
                    <div className="space-y-4 md:flex-1">
                        <h2 className="section__title text-blackColor uppercase">dapatkan update setiap hari</h2>
                        <p className="text-sm text-white">Kirimkan Email Address Anda Untuk Mendapatkan Update Terbaru</p>
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row md:flex-1">
                        <input type="email" placeholder="Email address" className="p-2 bg-white text-blackColor rounded-lg outline-none md:w-full" />
                        <a href="" className="flex items-center justify-center gap-2 btn bg-primaryColorLight text-white hover:opacity-80">
                            <i className="fa-solid fa-paper-plane"></i>
                            Subscribe
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;

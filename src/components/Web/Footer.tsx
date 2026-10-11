import { Mail } from "lucide-react";
import React from "react";
import { BsFacebook, BsGithub, BsInstagram } from "react-icons/bs";

const Footer = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6 gap-2">
            <h3>© {new Date().getFullYear()} NexSpent</h3>
            <div className="flex gap-4 justify-center items-center">
                <a
                    target="_blank"
                    href={"https://github.com/ghani726"}
                    className="text-2xl"
                >
                    <BsGithub></BsGithub>
                </a>
                <a
                    href={
                        "mailto:ghani726@outlook.com?subject=Contacted%20via%20NexSpent&body=Hi%20Ghani%20I%20%20was%20exploring%20NexSpent"
                    }
                    className="text-2xl"
                >
                    <Mail></Mail>
                </a>
                <a
                    target="_blank"
                    href={"https://www.instagram.com/ghani726x"}
                    className="text-2xl"
                >
                    <BsInstagram></BsInstagram>
                </a>
                <a
                    target="_blank"
                    href={"https://www.facebook.com/ghani726"}
                    className="text-2xl"
                >
                    <BsFacebook></BsFacebook>
                </a>
            </div>
        </div>
    );
};

export default Footer;

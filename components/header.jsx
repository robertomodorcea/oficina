import { useState } from "react";
import { Button, Tabs } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Link from "next/link";

const Header = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <header className="border border-gray-200 drop-shadow-sm px-4 xl:px-0">
            <section className="max-w-screen-xl m-auto py-5 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-800">Oficina</h1>
                <button onClick={showDrawer} className="flex text-lg lg:hidden">
                    <MenuOutlined />
                </button>
                <nav className="hidden lg:flex lg:items-center">
                    <ul className="flex gap-10 text-sm font-medium text-gray-700">
                        <li className="hover:text-blue-600 cursor-pointer">
                            <Link href='/'>Schedule</Link> 
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer">
                            <Link href='/drivers'>Drivers</Link> 
                        </li>
                    </ul>
                </nav>
                <Drawer
                    className="px-4"
                    placement="right"
                    onClose={onClose}
                    open={open}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </section>
        </header>
    );
};

export default Header;

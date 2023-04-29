import { useEffect, useState } from "react";
import Head from "next/head";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/plugin/updateLocale";
import updateLocale from "dayjs/plugin/updateLocale";
import locale from "antd/lib/locale/en_US";
import moment from "moment";
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
    weekStart: 1,
});

import Header from "@/components/header";

import {
    Button,
    Space,
    Table,
    Select,
    DatePicker,
    ConfigProvider,
    Modal,
    TimePicker,
    Divider,
} from "antd";

export default function Home(props) {
    const [drivers, setDrivers] = useState([]);
    const [driver, setDriver] = useState("");
    const [company, setCompany] = useState("Vinko");
    const [week, setWeek] = useState(30);
    const [modal2Open, setModal2Open] = useState(false);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        setDrivers(
            props.value
                .filter((obj) => obj.companyName === company)
                .map((obj, index) => {
                    return {
                        key: +index + 1,
                        name: obj.name,
                        start: obj.startDates[+week - 1].date
                            ? `${formatDate(obj.startDates[+week - 1].date)} ${
                                  obj.startDates[+week - 1].time
                              }`
                            : obj.startDates[+week - 1].date,
                        end: obj.endDates[+week - 1].date
                            ? `${formatDate(obj.endDates[+week - 1].date)} ${
                                  obj.endDates[+week - 1].time
                              }`
                            : obj.endDates[+week - 1].date,
                    };
                })
        );
    }, [company, week]);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Start",
            dataIndex: "start",
            key: "start",
        },
        {
            title: "End",
            dataIndex: "end",
            key: "end",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a
                        onClick={() => {
                            setDriver(record.name);
                            setModal2Open(true);
                        }}
                        className="font-medium text-blue-500 hover:text-blue-600"
                    >
                        Edit
                    </a>
                </Space>
            ),
        },
    ];

    function formatDate(dateStr) {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const date = new Date(dateStr);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedDate = `${day} ${months[monthIndex]}`;

        return formattedDate;
    }

    const onChange = (value) => {
        setCompany(value.charAt(0).toUpperCase() + value.slice(1));
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log("search:", value);
    };

    const dateOnChange = (value) => {
        console.log(value);
        if (value) {
            setWeek(+moment(value.$d).week() + 1);
        }
    };

    const format = "HH:mm";
    const format2 = "h:mm A";

    return (
        <>
            <Head>
                <title>Oficina</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="max-w-screen-xl mx-auto mt-16">
                {/* <p>{company}</p> */}
                <section className="flex gap-2">
                    <Select
                        showSearch
                        placeholder="Select company"
                        optionFilterProp="children"
                        defaultValue="vinko"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={[
                            {
                                value: "vinko",
                                label: "Vinko",
                            },
                            {
                                value: "aventus",
                                label: "Aventus",
                            },
                            {
                                value: "welvaart",
                                label: "Welvaart",
                            },
                        ]}
                    />
                    <ConfigProvider locale={locale}>
                        <DatePicker picker="week" onChange={dateOnChange} />
                    </ConfigProvider>
                </section>
                <Table
                    className="mt-10"
                    columns={columns}
                    dataSource={drivers}
                    pagination={false}
                />
            </main>
            <Modal
                title={`Edit Schedule: ${driver}`}
                centered
                open={modal2Open}
                okButtonProps={{ className: "bg-blue-500" }}
                onOk={() => {
                    const updateDriver = async () => {
                        try {
                            const response = await fetch("https://oficina-rho.vercel.app/api/update-driver", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    name: driver,
                                    startDate,
                                    startTime,
                                    endDate,
                                    endTime,
                                    week,
                                }),
                            });

                            if (!response.ok) {
                                throw new Error("Failed to update driver.");
                            }
                            console.log("Driver updated successfully!");
                        } catch (error) {
                            console.error(error);
                        }
                    };
                    updateDriver();
                    setModal2Open(false);
                }}
                onCancel={() => setModal2Open(false)}
            >
                <div className="mt-5 flex flex-col items-start gap-4">
                    <div className="flex items-center gap-2">
                        <label>Start Day</label>
                        <DatePicker
                            onChange={(value) => {
                                setStartDate(value);
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label>Start Time</label>
                        <TimePicker
                            format={format}
                            onChange={(value) => {
                                const now = new Date(value);
                                setStartTime(
                                    now.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
                <Divider />
                <div className="mt-5 flex flex-col items-start gap-4">
                    <div className="flex items-center gap-2">
                        <label>End Day</label>
                        <DatePicker
                            onChange={(value) => {
                                setEndDate(value);
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label>End Time</label>
                        <TimePicker
                            format={format}
                            onChange={(value) => {
                                const now = new Date(value);
                                setEndTime(
                                    now.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export async function getServerSideProps() {
    const response = await fetch("https://oficina-rho.vercel.app/api/get-driver");
    const value = await response.json();

    return {
        props: {
            value,
        },
    };
}

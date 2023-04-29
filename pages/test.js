import { useEffect, useState } from "react";
import { Select, Table, DatePicker, Button, Modal, TimePicker } from "antd";
import { MongoClient } from "mongodb";

import axios from "axios";

import Header from "@/components/header";

const columns = [
    {
        title: "Driver",
        dataIndex: "name",
    },
    {
        title: "Start Date",
        dataIndex: "start",
        sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
        },
    },
    {
        title: "End Date",
        dataIndex: "end",
        sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
        },
    },
    {
        title: "Actions",
        dataIndex: "action",
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
    },
];

const data = [
    {
        key: "1",
        name: "John Brown",
        chinese: 98,
        math: 60,
        english: "Edit",
    },
    {
        key: "2",
        name: "Jim Green",
        chinese: 98,
        math: 66,
        english: "Edit",
    },
    {
        key: "3",
        name: "Joe Black",
        chinese: 98,
        math: 90,
        english: "Edit",
    },
    {
        key: "4",
        name: "Jim Red",
        chinese: 88,
        math: 99,
        english: "Edit",
    },
];

const prop = true;

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

const App = ({ message }) => {
    
    const [modal2Open, setModal2Open] = useState(false);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    console.log(message);
    const format = "HH:mm";

    return (
        <>
            <Header />
            <main>
                <div className="max-w-screen-xl mx-auto mt-16">
                    <div className="flex mt-4 gap-4 items-end justify-between">
                        <div className="flex gap-4">
                            <div>
                                <p>Company</p>
                                <Select
                                    className="mt-1"
                                    defaultValue="vinko"
                                    style={{ width: 120 }}
                                    options={[
                                        { value: "vinko", label: "Vinko" },
                                        { value: "aventus", label: "Aventus" },
                                        {
                                            value: "welvaart",
                                            label: "Welvaart",
                                        },
                                    ]}
                                />
                            </div>
                            <div>
                                <p>Week</p>
                                <DatePicker className="mt-1" picker="week" />
                            </div>
                        </div>
                        <Button
                            onClick={() => setModal2Open(true)}
                            type="primary"
                            className="bg-blue-500"
                        >
                            Add
                        </Button>
                        <Modal
                            title="Jim Green"
                            centered
                            open={modal2Open}
                            okButtonProps={{ className: "bg-blue-500" }}
                            onOk={() => setModal2Open(false)}
                            onCancel={() => setModal2Open(false)}
                        >
                            <div className="flex gap-2 mt-5">
                                <div>
                                    <p>Start Day</p>
                                    <DatePicker />
                                </div>
                                <div>
                                    <p>Start Time</p>
                                    <TimePicker
                                        className="all:initial"
                                        format={format}
                                        ok
                                        okButtonProps={{
                                            style: "background: blue",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <div>
                                    <p>End Day</p>
                                    <DatePicker />
                                </div>
                                <div>
                                    <p>End Time</p>
                                    <DatePicker />
                                </div>
                            </div>
                        </Modal>
                    </div>
                    <Table
                        className="mt-8"
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </main>
        </>
    );
};

export default App;

export async function getServerSideProps() {
    const uri = process.env.MONGODB_URI;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        const db = client.db("oficina");
        const collection = db.collection("drivers");
        const driver = await collection.findOne({ _id: "644b8696185bb58f8be8e896" });
        const age = driver.name;
        return {
            props: {
                message: driver.age,
            },
        };
    } catch (e) {
        console.log(e);
        return {
            props: {
                message: "Failure",
            },
        };
    }
}

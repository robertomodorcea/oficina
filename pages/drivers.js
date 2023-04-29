import Header from "@/components/header";
import { Button, Modal, Form, Input, Checkbox, Select } from "antd";

import { useState, useEffect } from "react";

export default function Drivers() {
    const [selectedName, setSelectedName] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("Vinko");

    useEffect(() => {
        console.log(selectedCompany);
    }, [selectedCompany]);

    const [modal1Open, setModal1Open] = useState(false);

    const onFinish = (values) => {
        console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleClick = () => {
        setSelectedName("");
        alert(`${selectedName}`);
        setModal1Open(false);
    };

    const handleChange = (value) => {
        // console.log(value);
        setSelectedCompany(value.charAt(0).toUpperCase() + value.slice(1));
      };
      

    return (
        <>
            <Header />
            <main className="max-w-screen-xl mx-auto mt-16">
                <Button
                    type="primary"
                    className="bg-blue-500"
                    onClick={() => setModal1Open(true)}
                >
                    Add Driver
                </Button>
                <Modal
                    title="Add Driver"
                    centered
                    open={modal1Open}
                    onOk={() => {
                        setModal1Open(false);
                        const saveDriver = async () => {
                            try {
                                const response = await fetch('http://localhost:3000/api/new-driver', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({name: selectedName, companyName: selectedCompany})
                                });
                                const data = await response.json();
                                console.log(selectedName);
                            } catch (e) {
                                console.error(e);
                            }
                        };
                        saveDriver();
                    }}
                    onCancel={() => setModal1Open(false)}
                    okButtonProps={{
                        className: "bg-blue-500",
                    }}
                >
                    <Form
                        className="flex flex-col p-0 mt-5"
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Full Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input
                                value={selectedName}
                                onChange={(e) =>
                                    setSelectedName(e.target.value)
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Company" required="true">
                            <Select
                                className="w-full"
                                value={selectedCompany}
                                onChange={handleChange}
                            >
                                <Select.Option value="vinko">
                                    Vinko
                                </Select.Option>
                                <Select.Option value="aventus">
                                    Aventus
                                </Select.Option>
                                <Select.Option value="welvaart">
                                    Welvaart
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                    {/* <Button type="default" onClick={() => setSelectedName('')}>Clear</Button> */}
                </Modal>
            </main>
        </>
    );
}

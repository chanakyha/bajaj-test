"use client";

import { Input, Button, Select, Space } from "antd";
import type { SelectProps } from "antd";
import { useState } from "react";

export default function Home() {
  const sampleData = {
    data: ["M", "1", "334", "b", "55", "z"],
  };

  const [input, setInput] = useState<string>(JSON.stringify(sampleData));

  const options: SelectProps["options"] = [
    {
      label: "Characters",
      value: "characters",
    },
    {
      label: "Numbers",
      value: "numbers",
    },
    {
      label: "Highest Alphabets",
      value: "highest-alphabets",
    },
  ];

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const handleSubmit = async () => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/bfhl`, {
      method: "POST",
      body: JSON.stringify(JSON.parse(input)),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Message sent successfully");
    } else {
      alert("Error sending message: " + response.status);
    }
  };

  return (
    <main className="min-h-screen w-screen flex items-center justify-center bg-slate-200">
      <div className="w-[30rem] max-w-6xl mx-auto bg-slate-300 p-5 md:p-16 rounded-md shadow-xl border border-slate-800/20 flex flex-col gap-2">
        <h1 className="text-center font-medium text-2xl">Frontend Code</h1>
        <Input
          size="middle"
          style={{
            width: "100%",
            height: "2.5rem",
          }}
          onChange={(e) => setInput(e.target.value)}
          defaultValue={input}
          placeholder="API Input"
          variant="outlined"
        />
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Space style={{ width: "100%" }} direction="vertical">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%", height: "2.5rem" }}
            placeholder="Multi Filter"
            onChange={handleChange}
            options={options}
          />
        </Space>
      </div>
    </main>
  );
}

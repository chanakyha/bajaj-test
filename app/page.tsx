"use client";

import { Input, Button, Select, Space } from "antd";
import type { SelectProps } from "antd";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [filter, setFilter] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<any>();

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
    setFilter(value);
  };

  function isValidJSON(str: string) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  const handleSubmit = async () => {
    if (!isValidJSON(input)) {
      return alert("Please enter a valid JSON");
    }

    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/bfhl`, {
      method: "POST",
      body: JSON.stringify(JSON.parse(input)),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Response Accepted, Use Filter to check the responses");
      setResponseData(await response.json());
    } else {
      alert("Error sending message: " + response.status);
    }
  };

  return (
    <main className="min-h-screen w-screen flex items-center justify-center bg-slate-200">
      <div className="w-[40rem] max-w-6xl mx-auto bg-slate-300 p-5 md:p-16 rounded-md shadow-xl border border-slate-800/20 flex flex-col gap-2">
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
        <div className=" flex flex-col">
          {filter.includes("characters") && (
            <div className="flex items-center gap-3">
              <h1 className="font-bold">Characters:</h1>
              <div>{JSON.stringify(responseData?.alphabets)}</div>
            </div>
          )}
          {filter.includes("numbers") && (
            <div className="flex items-center gap-3">
              <h1 className="font-bold">Numbers:</h1>
              <div>{JSON.stringify(responseData?.numbers)}</div>
            </div>
          )}
          {filter.includes("highest-alphabets") && (
            <div className="flex items-center gap-3">
              <h1 className="font-bold">Highest Alphabets: </h1>
              <div>{JSON.stringify(responseData?.highest_alphabet)}</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

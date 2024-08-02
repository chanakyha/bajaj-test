import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const harcodedData = {
    operation_code: 1,
  };

  return NextResponse.json(harcodedData);
}

export async function POST(request: Request) {
  const requestData = await request.json();
  const data = {
    user_id: "Chanakyha.V_210920003",
    roll_number: "RA2111026020004",
    email: "cl9448@srmist.edu.in",
  };

  interface separateDataType {
    numbers: string[];
    alphabets: string[];
    highest_alphabet: string[];
  }

  function separateData(input: { data: string[] }): separateDataType {
    const numbers: string[] = [];
    const alphabets: string[] = [];
    let highestChar: string | null = null;

    input.data.forEach((item) => {
      if (!isNaN(Number(item))) {
        numbers.push(item);
      } else {
        alphabets.push(item);
        if (!highestChar || item > highestChar) {
          highestChar = item;
        }
      }
    });

    return {
      numbers,
      alphabets,
      highest_alphabet: highestChar ? [highestChar] : [],
    };
  }

  const finalOut = {
    is_success: true,
    ...data,
    ...separateData(requestData),
  };

  console.log(finalOut);

  return NextResponse.json(finalOut);
}

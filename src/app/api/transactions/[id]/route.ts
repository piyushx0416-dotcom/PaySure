import { NextResponse } from "next/server";
import { initialTransactions } from "@/lib/mockData";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const match = initialTransactions.find(
    (t) => t.id === id || t.utr === id
  );

  if (!match) {
    return NextResponse.json(
      { success: false, error: "Transaction not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    transaction: match,
  });
}

import { NextResponse } from "next/server";
import { transactionVerifySchema } from "@/lib/validations";
import { initialTransactions } from "@/lib/mockData";
import { runVerificationPipeline } from "@/lib/verificationEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = transactionVerifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { utr, amount } = parsed.data;

    // Run verification pipeline
    const result = runVerificationPipeline({
      amount,
      status: "SUCCESSFUL",
      utr,
      existingTransactions: initialTransactions,
    });

    return NextResponse.json({
      success: true,
      verified: result.transaction.status === "SUCCESSFUL",
      transaction: result.transaction,
      logs: result.logs,
      fraudAlert: result.fraudAlert || null,
      message:
        result.transaction.status === "SUCCESSFUL"
          ? "Authoritative payment verification confirmed by NPCI."
          : "Verification failed or flagged as suspicious.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}

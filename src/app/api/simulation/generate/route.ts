import { NextResponse } from "next/server";
import { simulationGenerateSchema } from "@/lib/validations";
import { runVerificationPipeline } from "@/lib/verificationEngine";
import { initialTransactions } from "@/lib/mockData";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = simulationGenerateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const result = runVerificationPipeline({
      amount: parsed.data.amount,
      status: parsed.data.status,
      source: parsed.data.source,
      payerName: parsed.data.payerName || "Demo Payer",
      networkCondition: parsed.data.networkCondition,
      existingTransactions: initialTransactions,
      isFakeScreenshotAttempt: parsed.data.isFakeScreenshotAttempt,
      reportedAmountMismatch: parsed.data.reportedAmountMismatch,
    });

    return NextResponse.json({
      success: true,
      transaction: result.transaction,
      logs: result.logs,
      fraudAlert: result.fraudAlert || null,
      isDuplicate: result.isDuplicate,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Simulation generation failed" },
      { status: 500 }
    );
  }
}

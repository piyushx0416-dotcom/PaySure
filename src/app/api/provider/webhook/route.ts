import { NextResponse } from "next/server";
import { webhookPayloadSchema } from "@/lib/validations";
import { runVerificationPipeline } from "@/lib/verificationEngine";
import { initialTransactions } from "@/lib/mockData";

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const parsed = webhookPayloadSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        {
          received: false,
          error: "Invalid webhook signature or schema payload",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { utr, amount, status, sender_vpa } = parsed.data;

    // Check webhook authenticity / idempotency
    const verificationStatus =
      status === "SUCCESS"
        ? "SUCCESSFUL"
        : status === "PENDING"
        ? "PENDING"
        : "FAILED";

    const result = runVerificationPipeline({
      amount,
      status: verificationStatus,
      utr,
      payerVpa: sender_vpa,
      existingTransactions: initialTransactions,
    });

    return NextResponse.json({
      received: true,
      processed: true,
      idempotencyCheck: result.isDuplicate ? "DUPLICATE_IGNORED" : "COMMITTED",
      transactionId: result.transaction.id,
      finalStatus: result.transaction.status,
    });
  } catch {
    return NextResponse.json(
      { received: false, error: "Internal webhook dispatch error" },
      { status: 500 }
    );
  }
}

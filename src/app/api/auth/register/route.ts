import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // In demo mode, return newly created vendor profile
    const newVendor = {
      id: `VEN-${Date.now()}`,
      name: parsed.data.fullName,
      businessName: parsed.data.businessName,
      phone: parsed.data.mobile,
      email: parsed.data.email,
      category: parsed.data.businessCategory,
      preferredLanguage: parsed.data.preferredLanguage,
      createdAt: new Date().toISOString(),
      isDemo: true,
    };

    return NextResponse.json({
      success: true,
      message: "Vendor account registered successfully.",
      vendor: newVendor,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

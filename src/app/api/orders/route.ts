import { NextResponse } from "next/server";
import { initialOrders } from "@/lib/mockData";
import { orderCreateSchema } from "@/lib/validations";

const ordersStore = [...initialOrders];

export async function GET() {
  return NextResponse.json({
    success: true,
    orders: ordersStore,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = orderCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const totalAmount = parsed.data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const nextOrderNumber = ordersStore.length > 0 ? Math.max(...ordersStore.map((o) => o.orderNumber)) + 1 : 1025;

    const newOrder = {
      id: `ORD-${nextOrderNumber}`,
      orderNumber: nextOrderNumber,
      items: parsed.data.items,
      totalAmount,
      paymentStatus: "PENDING" as const,
      orderStatus: "PENDING" as const,
      customerName: parsed.data.customerName || "Walk-in",
      tableOrToken: parsed.data.tableOrToken || `Token #${nextOrderNumber % 100}`,
      timestamp: new Date().toISOString(),
    };

    ordersStore.unshift(newOrder);

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

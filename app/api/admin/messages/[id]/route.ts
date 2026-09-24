import { NextRequest, NextResponse } from "next/server";
import { setMessageRead, deleteMessage } from "@/lib/queries";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const message = await setMessageRead(Number(params.id), Boolean(body.read));
    return NextResponse.json(message);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await deleteMessage(Number(params.id));
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}

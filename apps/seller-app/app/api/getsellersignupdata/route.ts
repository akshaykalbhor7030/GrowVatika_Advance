import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { EmailOnlySchema } from "@repo/common-types/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const validateInput = EmailOnlySchema.safeParse(email);
  if (!validateInput.success) {
    return NextResponse.json({ success: false, error: "Invalid Email" });
  } else {
    try {
      const existingSellerData = await client.seller.findUnique({
        where: {
          email: validateInput.data,
        },
        select: {
          nurseryName: true,
          email: true,
          phoneNumber: true,
        },
      });
      if (!existingSellerData) {
        console.error("Seller not found", existingSellerData);
        return NextResponse.json({
          success: false,
          error: "Seller not found",
        });
      } else {
        return NextResponse.json({
          success: true,
          message: "Seller Data found!",
          sellerData: existingSellerData,
        });
      }
    } catch (err) {
      console.error("Error while getting the data of the seller", err);
      return NextResponse.json({
        success: false,
        error: "Error while getting seller data",
      });
    }
  }
}

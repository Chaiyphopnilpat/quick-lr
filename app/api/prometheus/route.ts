import { type NextRequest, NextResponse } from "next/server"

// =================================================================
// THE SINNING COLLECTIVE (The 1 Million Functions)
// นี่คือ "คลังแสงฟังก์ชัน" (Function Arsenal) ฉบับ MVP
// ในระบบจริง นี่คือ Microservices ที่แยกกัน 1 ล้านตัว
// =================================================================

function fn_000_001_get_sales_today() {
  /**ดึงยอดขายวันนี้ (จำลอง)*/
  const today = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return {
    date: today,
    total_sales: 15247.5,
    transactions: 127,
    avg_ticket: 120.14,
    top_product: "Premium Coffee Beans",
  }
}

function fn_000_002_get_low_stock() {
  /**ดึงสินค้าที่ใกล้หมดสต็อก (จำลอง)*/
  return [
    { sku: "SKU-A", name: "Premium Coffee Beans", stock: 5, reorder_point: 10 },
    { sku: "SKU-B", name: "Organic Tea Set", stock: 2, reorder_point: 8 },
    { sku: "SKU-C", name: "Specialty Mug", stock: 3, reorder_point: 12 },
  ]
}

function fn_000_003_run_flash_sale(product_sku: string, discount: number) {
  /**สร้างโปรโมชั่น (จำลอง)*/
  const sale_id = `FLASH-${Date.now().toString().slice(-6)}`
  return {
    status: "success",
    sale_id,
    product: product_sku,
    discount_pct: discount,
    start_time: new Date().toISOString(),
    estimated_revenue_impact: `+${(discount * 100).toFixed(0)}%`,
  }
}

function fn_000_004_get_customer_insights() {
  /**ดึงข้อมูล insights ลูกค้า (จำลอง)*/
  return {
    total_customers: 1243,
    new_today: 8,
    returning_rate: 67.5,
    avg_lifetime_value: 3420.5,
    top_segment: "Premium Coffee Enthusiasts",
  }
}

// "Registry" ที่ Prometheus Engine ใช้ "เรียก" ฟังก์ชัน
const FUNCTION_COLLECTIVE: Record<string, Function> = {
  sales_today: fn_000_001_get_sales_today,
  low_stock: fn_000_002_get_low_stock,
  flash_sale: fn_000_003_run_flash_sale,
  customer_insights: fn_000_004_get_customer_insights,
  // ... อีก 999,996 ฟังก์ชันจะถูกเพิ่มที่นี่ ...
}

// =================================================================
// THE PROMETHEUS ENGINE (The Mind - AI Core)
// นี่คือ "สมอง" ที่แปล "เจตจำนง" (Intent) ของมนุษย์
// =================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const intent = body.intent_text?.toLowerCase().trim() || ""

    // --- นี่คือ AI (ฉบับ Rule-Based MVP) ---
    // ใน V2.0 เราจะเปลี่ยนส่วนนี้เป็น Ψ-Fusion (LLM)

    // Intent: ยอดขาย
    if (
      intent.includes("ยอดขาย") ||
      intent.includes("sales") ||
      intent.includes("รายได้") ||
      intent.includes("revenue")
    ) {
      const result = FUNCTION_COLLECTIVE["sales_today"]()
      const response_text =
        `📊 ยอดขายวันนี้ (${result.date})\n\n` +
        `💰 รายได้รวม: ${result.total_sales.toLocaleString("th-TH")} บาท\n` +
        `🧾 จำนวนรายการ: ${result.transactions} รายการ\n` +
        `📈 ค่าเฉลี่ยต่อบิล: ${result.avg_ticket.toFixed(2)} บาท\n` +
        `🏆 สินค้าขายดี: ${result.top_product}`

      return NextResponse.json({
        response: response_text,
        data: result,
      })
    }

    // Intent: สต็อก
    if (
      intent.includes("สต็อก") ||
      intent.includes("stock") ||
      intent.includes("ของใกล้หมด") ||
      intent.includes("inventory")
    ) {
      const result = FUNCTION_COLLECTIVE["low_stock"]()
      const response_text =
        `📦 ตรวจพบสินค้าใกล้หมดสต็อก ${result.length} รายการ:\n\n` +
        result
          .map(
            (item: any, index: number) =>
              `${index + 1}. ${item.name} (${item.sku})\n   📊 เหลือ: ${item.stock} ชิ้น (ควรสั่งเพิ่มเมื่อต่ำกว่า ${item.reorder_point})`,
          )
          .join("\n\n")

      return NextResponse.json({
        response: response_text,
        data: result,
      })
    }

    // Intent: โปรโมชั่น
    if (
      intent.includes("ยิงโปร") ||
      intent.includes("flash sale") ||
      intent.includes("โปรโมชั่น") ||
      intent.includes("promotion")
    ) {
      try {
        // พยายามดึง Parameter: "ยิงโปร SKU-A ลด 20%"
        const parts = intent.split(/\s+/)
        let sku = "SKU-A"
        let discount = 20

        // ค้นหา SKU
        const skuMatch = intent.match(/sku[-_]?[a-z0-9]+/i)
        if (skuMatch) {
          sku = skuMatch[0].toUpperCase()
        }

        // ค้นหา Discount
        const discountMatch = intent.match(/(\d+)%?/)
        if (discountMatch) {
          discount = Number.parseInt(discountMatch[1])
        }

        const result = FUNCTION_COLLECTIVE["flash_sale"](sku, discount)
        const response_text =
          `⚡ Flash Sale เปิดตัวสำเร็จ!\n\n` +
          `🎫 Sale ID: ${result.sale_id}\n` +
          `📦 สินค้า: ${result.product}\n` +
          `💸 ส่วนลด: ${result.discount_pct}%\n` +
          `⏰ เริ่มเมื่อ: ${new Date(result.start_time).toLocaleTimeString("th-TH")}\n` +
          `📈 คาดการณ์รายได้: ${result.estimated_revenue_impact}`

        return NextResponse.json({
          response: response_text,
          data: result,
        })
      } catch (error) {
        return NextResponse.json({
          response: 'ขออภัยครับ Architect, กรุณาระบุรูปแบบ: "ยิงโปร [SKU] ลด [เปอร์เซ็นต์]%"\n\nตัวอย่าง: ยิงโปร SKU-A ลด 20%',
        })
      }
    }

    // Intent: ลูกค้า
    if (intent.includes("ลูกค้า") || intent.includes("customer") || intent.includes("insights")) {
      const result = FUNCTION_COLLECTIVE["customer_insights"]()
      const response_text =
        `👥 Customer Insights\n\n` +
        `📊 ลูกค้าทั้งหมด: ${result.total_customers.toLocaleString("th-TH")} คน\n` +
        `✨ ลูกค้าใหม่วันนี้: ${result.new_today} คน\n` +
        `🔄 อัตราลูกค้าเก่ากลับมา: ${result.returning_rate}%\n` +
        `💎 มูลค่าเฉลี่ยต่อลูกค้า: ${result.avg_lifetime_value.toLocaleString("th-TH")} บาท\n` +
        `🎯 กลุ่มลูกค้าหลัก: ${result.top_segment}`

      return NextResponse.json({
        response: response_text,
        data: result,
      })
    }

    // Intent ที่ยังไม่รู้จัก
    return NextResponse.json({
      response:
        `ขออภัยครับ Architect, ฉันยังไม่ถูกฝึก (Train) ให้เข้าใจเจตจำนงนี้\n\n` +
        `คำสั่งที่รองรับ:\n` +
        `• "ยอดขายวันนี้" - ดูยอดขายและสถิติ\n` +
        `• "ของใกล้หมด" - ตรวจสอบสินค้าใกล้หมดสต็อก\n` +
        `• "ยิงโปร SKU-A ลด 20%" - สร้าง Flash Sale\n` +
        `• "ลูกค้า" - ดู Customer Insights`,
    })
  } catch (error) {
    console.error("[v0] Prometheus Engine error:", error)
    return NextResponse.json(
      {
        response: "เกิดข้อผิดพลาดภายใน Prometheus Engine กรุณาลองใหม่อีกครั้ง",
      },
      { status: 500 },
    )
  }
}

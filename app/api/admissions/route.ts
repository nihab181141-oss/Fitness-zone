import { NextRequest, NextResponse } from 'next/server'

interface AdmissionPayload {
  name: string
  phone: string
  planId: string
  branchId: string
  sessionPreference?: string
  notes?: string
}

// In-memory store for admissions during the server lifecycle
const receivedAdmissions: Array<AdmissionPayload & { id: string; submittedAt: string }> = []

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, planId, branchId, sessionPreference, notes } = body as Partial<AdmissionPayload>

    // 1. Validation: Name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid full name (at least 2 characters).' },
        { status: 400 }
      )
    }

    // 2. Validation: Phone (Supports BD standard 11-digit or general international format)
    const cleanPhone = (phone || '').replace(/[\s\-()]/g, '')
    if (!cleanPhone || cleanPhone.length < 9 || cleanPhone.length > 16 || !/^\+?[0-9]{9,16}$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid contact number (e.g., 017XXXXXXXX).' },
        { status: 400 }
      )
    }

    // 3. Validation: Plan
    const validPlans = ['1-month', '3-month', '6-month', '12-month', 'lifetime']
    if (!planId || !validPlans.includes(planId)) {
      return NextResponse.json(
        { success: false, error: 'Please select a valid membership package.' },
        { status: 400 }
      )
    }

    // 4. Validation: Branch
    const validBranches = ['new-market', 'bhadra']
    if (!branchId || !validBranches.includes(branchId)) {
      return NextResponse.json(
        { success: false, error: 'Please select a valid primary branch (New Market or Bhadra).' },
        { status: 400 }
      )
    }

    // Record the verified admission
    const admissionRecord = {
      id: `FZ-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim(),
      phone: cleanPhone,
      planId,
      branchId,
      sessionPreference: sessionPreference || 'flexible',
      notes: notes?.trim() || '',
      submittedAt: new Date().toISOString(),
    }

    receivedAdmissions.push(admissionRecord)

    return NextResponse.json(
      {
        success: true,
        message: 'Admission inquiry successfully recorded.',
        admissionId: admissionRecord.id,
        submittedAt: admissionRecord.submittedAt,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing admission inquiry:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your admission inquiry.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    totalReceived: receivedAdmissions.length,
    latest: receivedAdmissions.slice(-5),
  })
}

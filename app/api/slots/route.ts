import { NextRequest, NextResponse } from 'next/server';
import { getSlotData } from '@/lib/slots';

export async function GET(request: NextRequest) {
  try {
    const slots = await getSlotData();
    
    return NextResponse.json({
      success: true,
      data: slots
    });
  } catch (error) {
    console.error('Error fetching slot data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch slot data' 
      },
      { status: 500 }
    );
  }
}

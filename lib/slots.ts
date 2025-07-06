// Genesis 50 Slot Management System
// This manages the 25 Advanced + 25 Pro slot allocation

export interface SlotData {
  advancedRemaining: number;
  proRemaining: number;
  advancedTotal: number;
  proTotal: number;
  lastUpdated: string;
}

// In a real implementation, this would be stored in a database
// For now, we'll use a simple JSON file approach
const SLOTS_FILE_PATH = '/tmp/genesis50-slots.json';

const DEFAULT_SLOTS: SlotData = {
  advancedRemaining: 25,
  proRemaining: 25,
  advancedTotal: 25,
  proTotal: 25,
  lastUpdated: new Date().toISOString()
};

export async function getSlotData(): Promise<SlotData> {
  try {
    // In production, this would read from a database
    // For development, we'll use localStorage on client or file system on server
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('genesis50-slots');
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return DEFAULT_SLOTS;
  } catch (error) {
    console.error('Error reading slot data:', error);
    return DEFAULT_SLOTS;
  }
}

export async function updateSlotData(data: SlotData): Promise<void> {
  try {
    data.lastUpdated = new Date().toISOString();
    
    // In production, this would write to a database
    // For development, we'll use localStorage on client
    if (typeof window !== 'undefined') {
      localStorage.setItem('genesis50-slots', JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error updating slot data:', error);
    throw error;
  }
}

export async function reserveSlot(tierName: string): Promise<boolean> {
  const slots = await getSlotData();
  
  if (tierName === 'Advanced Pre-Order' && slots.advancedRemaining > 0) {
    slots.advancedRemaining -= 1;
    await updateSlotData(slots);
    return true;
  } else if (tierName === 'Professional Pre-Order' && slots.proRemaining > 0) {
    slots.proRemaining -= 1;
    await updateSlotData(slots);
    return true;
  }
  
  return false; // No slots available
}

export async function releaseSlot(tierName: string): Promise<void> {
  const slots = await getSlotData();
  
  if (tierName === 'Advanced Pre-Order' && slots.advancedRemaining < slots.advancedTotal) {
    slots.advancedRemaining += 1;
    await updateSlotData(slots);
  } else if (tierName === 'Professional Pre-Order' && slots.proRemaining < slots.proTotal) {
    slots.proRemaining += 1;
    await updateSlotData(slots);
  }
}

export function isSlotAvailable(tierName: string, slots: SlotData): boolean {
  if (tierName === 'Advanced Pre-Order') {
    return slots.advancedRemaining > 0;
  } else if (tierName === 'Professional Pre-Order') {
    return slots.proRemaining > 0;
  }
  return false;
}

export function areAllSlotsSoldOut(slots: SlotData): boolean {
  return slots.advancedRemaining === 0 && slots.proRemaining === 0;
}

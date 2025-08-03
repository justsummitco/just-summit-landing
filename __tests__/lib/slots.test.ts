import { getSlotData, updateSlotData, SlotData } from "@/lib/slots";

// Mock localStorage for client-side testing
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Slot Counter Functionality", () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test("should initialize with correct default values", async () => {
    const slotData = await getSlotData();

    expect(slotData.advancedRemaining).toBe(0);
    expect(slotData.proRemaining).toBe(0);
    expect(slotData.advancedTotal).toBe(25);
    expect(slotData.proTotal).toBe(25);
  });

  test("should correctly calculate remaining slots display", async () => {
    const slotData = await getSlotData();

    expect(`${slotData.advancedRemaining}/${slotData.advancedTotal}`).toBe("0/25");
    expect(`${slotData.proRemaining}/${slotData.proTotal}`).toBe("0/25");
  });

  test("should read existing slot data from localStorage", async () => {
    const mockData = {
      advancedRemaining: 5,
      proRemaining: 3,
      advancedTotal: 25,
      proTotal: 25,
      lastUpdated: "2023-01-01T00:00:00.000Z",
    };
    localStorageMock.setItem("genesis50-slots", JSON.stringify(mockData));

    const slotData = await getSlotData();

    expect(slotData.advancedRemaining).toBe(5);
    expect(slotData.proRemaining).toBe(3);
    expect(`${slotData.advancedRemaining}/${slotData.advancedTotal}`).toBe("5/25");
    expect(`${slotData.proRemaining}/${slotData.proTotal}`).toBe("3/25");
  });

  test("should update slot data correctly in localStorage", async () => {
    const newData: SlotData = {
      advancedRemaining: 1,
      proRemaining: 0,
      advancedTotal: 25,
      proTotal: 25,
      lastUpdated: new Date().toISOString(),
    };

    await updateSlotData(newData);

    const storedData = JSON.parse(localStorageMock.getItem("genesis50-slots") || "{}");
    expect(storedData.advancedRemaining).toBe(1);
    expect(storedData.proRemaining).toBe(0);
  });

  test("should update lastUpdated timestamp when data changes", async () => {
    const initialData = await getSlotData();
    const initialTimestamp = initialData.lastUpdated;

    // Wait a moment to ensure timestamp difference
    await new Promise((resolve) => setTimeout(resolve, 10));

    const updatedData: SlotData = {
      ...initialData,
      advancedRemaining: initialData.advancedRemaining + 1,
    };

    await updateSlotData(updatedData);
    const newData = await getSlotData();

    expect(newData.lastUpdated).not.toBe(initialTimestamp);
    expect(new Date(newData.lastUpdated).getTime()).toBeGreaterThan(
      new Date(initialTimestamp).getTime()
    );
  });
});


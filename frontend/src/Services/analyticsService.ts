export type AnalyticsEventType =
  | "PAGE_VIEW"
  | "PRODUCT_VIEW"
  | "ADD_TO_CART"
  | "REMOVE_FROM_CART"
  | "LOGIN"
  | "REGISTER"
  | "CHECKOUT_START"
  | "ORDER_CREATED";

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  productId?: number;
  path?: string;
  userId?: number;
  orderId?: string;
  orderTotal?: number;
  createdAt: string;
}

const STORAGE_KEY = "ecom-analytics-events";

const getEvents = (): AnalyticsEvent[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data) as AnalyticsEvent[];
  } catch {
    return [];
  }
};

const saveEvents = (events: AnalyticsEvent[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

const track = (
  type: AnalyticsEventType,
  data: Omit<AnalyticsEvent, "id" | "type" | "createdAt"> = {},
) => {
  const events = getEvents();

  const event: AnalyticsEvent = {
    id: `${Date.now()}-${Math.random()}`,
    type,
    ...data,
    createdAt: new Date().toISOString(),
  };

  events.push(event);

  saveEvents(events);

  window.dispatchEvent(new Event("analytics-updated"));
};

const clear = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("analytics-updated"));
};

const getAll = () => {
  return getEvents();
};

export const analyticsService = {
  track,
  getAll,
  clear,
};

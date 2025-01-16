import AvailabilitySchema from "./availability.schema";
import { type IAvailability } from "./availability.dto";
import { Types } from "mongoose";

/**
 * Creates multiple availability slots for a given staffId, date and startTime-endTime range
 * @param data - The data for the availability slots to be created
 * @returns The newly created availability slots
 */
export const createAvailability = async (data: IAvailability, _id: string) => {
  const { date, startTime, endTime } = data;

  const start = new Date(startTime); // Convert startDate to Date object
  const end = new Date(endTime); // Convert endDate to Date object

  // Extract hours and minutes from startDate and endDate
  const startHour = start.getHours(); // Get the hour from startDate
  const startMinute = start.getMinutes(); // Get the minutes from startDate
  const endHour = end.getHours(); // Get the hour from endDate
  const endMinute = end.getMinutes(); // Get the minutes from endDate

  // Prepare availability slots
  const availabilitySlots: IAvailability[] = [];

  // Generate availability slots for each hour between startHour and endHour
  for (let hour = startHour; hour < endHour; hour++) {
    const slotStart = new Date(date); // Create a new Date object based on the provided `date`
    slotStart.setHours(hour, startMinute, 0, 0); // Set start time to the corresponding hour and minute

    const slotEnd = new Date(slotStart); // Clone the start date and time
    slotEnd.setHours(hour + 1, endMinute, 0, 0); // Set end time to 1 hour later

    const slot = new AvailabilitySchema({
      staffId:_id,
      date,
      startTime: slotStart.toISOString(), // Convert to ISO string format
      endTime: slotEnd.toISOString(), // Convert to ISO string format
      isAvailable: true,
    });

    availabilitySlots.push(slot);
  }

  const result = await AvailabilitySchema.insertMany(availabilitySlots);
  return result;
};

/**
 * Retrieves all available slots that match the given filter.
 * @param filter - The filter object containing keys of fields to filter by and their corresponding values.
 * @returns A promise that resolves to an array of available slots.
 */
export const getAllAvailability = async (filter: IAvailability) => {
  const result = await AvailabilitySchema.find({
    ...filter,
    isAvailable: true,
  }).lean();
  return result;
};

/**
 * Retrieves all available slots for a given staff member starting from today's date.
 * @param _id - The MongoDB ObjectId of the staff member.
 * @returns A promise that resolves to an array of available slots.
 */
export const getStaffAvailability = async (_id: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await AvailabilitySchema.find({
    staffId: _id,
    date: { $gte: today },
    isAvailable: true,
  }).lean();

  return result;
};

/**
 * Books an availability slot by setting it as unavailable.
 * @param _id - The MongoDB ObjectId of the availability slot to be booked.
 * @returns A promise that resolves to the updated availability slot.
 */
export const bookAvailability = async (_id: string) => {
  const result = await AvailabilitySchema.findByIdAndUpdate(
    _id,
    {
      isAvailable: false,
    },
    { new: true }
  );
  return result;
};

/**
 * Cancels an availability slot by setting it as available.
 * @param _id - The MongoDB ObjectId of the availability slot to be canceled.
 * @returns A promise that resolves to the updated availability slot.
 */
export const cancelAvailability = async (_id: Types.ObjectId) => {
  const result = await AvailabilitySchema.findByIdAndUpdate(
    _id,
    {
      isAvailable: true,
    },
    { new: true }
  );
};

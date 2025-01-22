import AvailabilitySchema from "./availability.schema";
import { type IAvailability } from "./availability.dto";
import { Types } from "mongoose";
import { AppDataSource } from "../common/services/postgres-database.service";
import { Availability } from "./availability.entity";
import { User } from "../users/user.entity";
import { Equal, MoreThanOrEqual } from "typeorm";

const availabilityRepository = AppDataSource.getRepository(Availability);
const userRepository = AppDataSource.getRepository(User);

/**
 * Creates availability slots for a given staff member.
 * @param {Object} data - The object containing the data to create availability slots.
 * @param {string} data.date - The date for which to create availability slots.
 * @param {string} data.startTime - The time at which the availability slots should start.
 * @param {string} data.endTime - The time at which the availability slots should end.
 * @param {string} _id - The id of the staff member for which to create availability slots.
 * @returns {Promise<IAvailability[]>} A promise that resolves to an array of created availability slots.
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
  const availabilitySlots: any = [];
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ _id });

  if (!user) {
    throw new Error("User not found");
  }

  // Generate availability slots for each hour between startHour and endHour
  for (let hour = startHour; hour < endHour; hour++) {
    const slotStart = new Date(date); // Create a new Date object based on the provided `date`
    slotStart.setHours(hour, startMinute, 0, 0); // Set start time to the corresponding hour and minute

    const slotEnd = new Date(slotStart); // Clone the start date and time
    slotEnd.setHours(hour + 1, endMinute, 0, 0); // Set end time to 1 hour later

    const slot = new Availability();
    slot.staffId = user;
    slot.date = date;
    slot.startTime = slotStart; // Convert to ISO string format
    slot.endTime = slotEnd; // Convert to ISO string format
    slot.isAvailable = true;

    availabilitySlots.push(slot);
  }

  // const result = await AvailabilitySchema.insertMany(availabilitySlots);
  // return result;

  console.log(availabilitySlots);
  const result = await availabilityRepository.save(availabilitySlots);
  return result;
};
/**
 * Retrieves all available slots that match the given filter.
 * @param filter - The filter object containing keys of fields to filter by and their corresponding values.
 * @returns A promise that resolves to an array of available slots.
 */
export const getAllAvailability = async (filter: {}) => {
  const result = await availabilityRepository.find({
    where: {
      ...filter,
      isAvailable: true,
    },
    relations: ["staffId"],
  });

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
  const result = await availabilityRepository.find({
    where: {
      staffId: Equal(_id),
      date: MoreThanOrEqual(today),
      isAvailable: true,
    },
    relations: ["staffId"],
  });
  console.log(result);
  return result;
};

/**
 * Books an availability slot by setting it as unavailable.
 * @param _id - The MongoDB ObjectId of the availability slot to be booked.
 * @returns A promise that resolves to the updated availability slot.
 */
export const bookAvailability = async (_id: string) => {
  const result = await availabilityRepository.findOneBy({ _id: _id });
  if (!result) {
    throw new Error("Availability not found");
  }
  result.isAvailable = false;
  await availabilityRepository.save(result);
  return result;
};

/**
 * Cancels an availability slot by setting it as available.
 * @param _id - The MongoDB ObjectId of the availability slot to be canceled.
 * @returns A promise that resolves to the updated availability slot.
 */
export const cancelAvailability = async (_id: string) => {
  const result = await availabilityRepository.findOneBy({ _id: _id });
  if (!result) {
    throw new Error("Availability not found");
  }
  result.isAvailable = true;
  await availabilityRepository.save(result);
  return result;
};

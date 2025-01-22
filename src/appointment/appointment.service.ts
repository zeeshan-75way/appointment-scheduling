import AppointmentSchema from "./appointment.schema";
import { IAppointment } from "./appointment.dto";
import { sendEmail } from "../common/helper/sendEmail";
import { AppDataSource } from "../common/services/postgres-database.service";
import { Appointment } from "./appointment.entity";
import { User } from "../users/user.entity";
import { Between, Equal, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const appointmentRepository = AppDataSource.getRepository(Appointment);
const userRepository = AppDataSource.getRepository(User);
/**
 * Books an appointment and sends an email to the user.
 * @param {IAppointment} data - The appointment data.
 * @param {string} userId - The id of the user booking the appointment.
 * @param {Date} date - The date of the appointment.
 * @param {Date} startTime - The start time of the appointment.
 * @returns {Promise<void>} A promise that resolves when the appointment is booked and the email is sent.
 */
export const bookAppointment = async (
  data: any,
  userId: string,
  date: Date,
  startTime: Date
) => {
  // Create a new appointment record
  const appointment = await appointmentRepository.create({
    ...data,
    userId,
    status: "BOOKED",
    date,
    startTime,
  });

  // Save the appointment in the database
  const result = await appointmentRepository.save(appointment);

  // Get the user details to send an email
  const user = await userRepository.findOne({
    where: { _id: userId },
    select: ["email"],
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Send the email notification
  const subject = "Appointment Booked";
  const html = `<p>Hello,</p>
                <p>You have successfully booked an appointment.</p>
                <p>Please make sure to attend on time.</p>
                <p>Thank you!</p>`;

  await sendEmail({
    email: user.email,
    html,
    subject,
  });

  return result;
};

/**
 * Cancels an appointment and sends an email to the user.
 * @param {string} _id - The MongoDB ObjectId of the appointment to be cancelled.
 * @returns {Promise<IAppointment>} A promise that resolves to the updated appointment.
 */
export const cancelAppointment = async (_id: string) => {
  const result = await appointmentRepository.findOne({
    where: { _id: _id },
    relations: ["userId", "availabilityId"],
  });

  if (!result) {
    throw new Error("No Appointment Found");
  }

  result.status = "CANCELLED";

  await appointmentRepository.save(result);

  const subject = "Appointment Cancelled";
  const html = `<p>Hello,</p>
                  <p>You have successfully Cancelled and appointment</p>
                  <p>Thank you!</p>`;

  await sendEmail({
    email: result.userId.email,
    html,
    subject,
  });
  return result;
};

/**
 * Reschedules an appointment and sends an email to the user.
 * @param {string} _id - The MongoDB ObjectId of the appointment to be rescheduled.
 * @returns {Promise<IAppointment>} A promise that resolves to the updated appointment.
 */
export const rescheduleAppointment = async (_id: string) => {
  const result = await appointmentRepository.findOne({
    where: { _id: _id },
    relations: ["userId"],
  });

  if (!result) {
    throw new Error("Appointment not found");
  }
  result.serviceId = result.serviceId;

  await appointmentRepository.save(result);

  const subject = "Appointment Rescheduled";
  const html = `<p>Hello,</p>
                  <p>You have successfully Rescheduled and appointment</p>
                  <p>Thank you!</p>`;

  await sendEmail({
    email: result?.userId?.email,
    html,
    subject,
  });
  return result;
};

/**
 * Retrieves an appointment by its id and populates the availabilityId field.
 * @param _id - The MongoDB ObjectId of the appointment to be retrieved.
 * @returns A promise that resolves to the retrieved appointment.
 */
export const getAppointmentById = async (_id: string) => {
  const result = await appointmentRepository.findOne({
    where: { _id: _id },
    relations: ["availabilityId"],
  });
  return result;
};

/**
 * Retrieves all appointments for a given user.
 * @param _id - The MongoDB ObjectId of the user whose appointments are to be retrieved.
 * @returns A promise that resolves to an array of appointments.
 */
export const getUserAppointments = async (_id: string) => {
  const appointments = await appointmentRepository.find({
    where: { userId: Equal(_id) },
    relations: ["availabilityId", "serviceId"],
  });
  console.log(appointments);

  return appointments;
};

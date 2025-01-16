import AppointmentSchema from "./appointment.schema";
import { IAppointment } from "./appointment.dto";
import { sendEmail } from "../common/helper/sendEmail";

/**
 * Books an appointment and sends an email to the user.
 * @param {IAppointment} data - The appointment data.
 * @param {string} userId - The id of the user booking the appointment.
 * @param {Date} date - The date of the appointment.
 * @param {Date} startTime - The start time of the appointment.
 * @returns {Promise<void>} A promise that resolves when the appointment is booked and the email is sent.
 */
export const bookAppointment = async (
  data: IAppointment,
  userId: string,
  date: Date,
  startTime: Date
) => {
  const result = await AppointmentSchema.create({
    ...data,
    userId: userId,
    status: "BOOKED",
    date,
    startTime,
  });

  const user: any = await result.populate({
    path: "userId",
    select: "-password",
  });
  console.log(result);

  const subject = "Appointment Booked";
  const html = `<p>Hello,</p>
                  <p>You have successfully booked and appointment</p>
                  <p>Please make sure to attend on time.</p>
                  <p>Thank you!</p>`;

  return await sendEmail({
    email: user?.userId?.email,
    html,
    subject,
  });
};

/**
 * Cancels an appointment and sends an email to the user.
 * @param {string} _id - The MongoDB ObjectId of the appointment to be cancelled.
 * @returns {Promise<IAppointment>} A promise that resolves to the updated appointment.
 */
export const cancelAppointment = async (_id: string) => {
  const result: any = await AppointmentSchema.findByIdAndUpdate(
    _id,
    {
      status: "CANCELLED",
    },
    { new: true }
  ).populate({
    path: "userId",
    select: "-password",
  });
  const subject = "Appointment Cancelled";
  const html = `<p>Hello,</p>
                  <p>You have successfully Cancelled and appointment</p>
                  <p>Thank you!</p>`;

  await sendEmail({
    email: result?.userId?.email,
    html,
    subject,
  });
  return result;
};

/**
 * Retrieves all booked appointments scheduled within the next 24 hours.
 * @returns {Promise<IAppointment[]>} A promise that resolves to an array of upcoming booked appointments.
 */

export const upcomingReminder = async () => {
  const now = new Date();
  const upcomingTime = new Date(now);
  upcomingTime.setHours(now.getHours() + 24);
  const appointments = await AppointmentSchema.find({
    date: { $gte: now, $lte: upcomingTime },
    status: "BOOKED",
  }).populate({
    path: "userId",
    select: "-password",
  });
  return appointments;
};

/**
 * Sends reminders to users about upcoming appointments.
 * @param {IAppointment[]} appointments - The upcoming appointments to send reminders for.
 * @returns {Promise<void>} A promise that resolves when all reminders have been sent.
 */
export const sendAppointmentReminders = async (appointments: any) => {
  for (const appointment of appointments) {
    const userEmail = appointment.userId?.email;
    if (!userEmail) {
      console.log(`No email found for appointment with ID ${appointment._id}`);
      continue;
    }

    const subject = "Upcoming Appointment Reminder";
    const text = `Hello, you have an upcoming appointment scheduled for Today. Please make sure to attend on time.`;
    const html = `<p>Hello,</p>
                  <p>You have an upcoming appointment scheduled for <strong>Today. </strong>.</p>
                  <p>Please make sure to attend on time.</p>
                  <p>Thank you!</p>`;

    return await sendEmail({ email: userEmail, html, subject });
  }
};

/**
 * Reschedules an appointment and sends an email to the user.
 * @param {string} _id - The MongoDB ObjectId of the appointment to be rescheduled.
 * @returns {Promise<IAppointment>} A promise that resolves to the updated appointment.
 */
export const rescheduleAppointment = async (_id: string) => {
  const result: any = await AppointmentSchema.findByIdAndUpdate(
    _id,
    {
      status: "RESCHEDULED",
    },
    { new: true }
  ).populate({
    path: "userId",
    select: "-password",
  });
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
  const result = await AppointmentSchema.findById(_id).populate(
    "availabilityId"
  );
  return result;
};

/**
 * Retrieves all appointments for a given user.
 * @param _id - The MongoDB ObjectId of the user whose appointments are to be retrieved.
 * @returns A promise that resolves to an array of appointments.
 */
export const getUserAppointments = async (_id: string) => {
  const result = await AppointmentSchema.find({ userId: _id })
    .populate("availabilityId")
    .populate("serviceId");
  return result;
};

import * as AppointmentService from "./appointment.service";
import * as AvailabilityService from "../availability/availability.service";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { IUser } from "../users/user.dto";

/**
 * @api {post} /appointment Book an appointment
 * @apiName bookAppointment
 * @apiGroup Appointment
 *
 * @apiParam {ObjectId} availabilityId The id of the availability slot to be booked
 * @apiParam {ObjectId} serviceId The id of the service to be booked
 *
 * @apiSuccess (201) {Object} appointment The booked appointment
 */
export const bookAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req.user as IUser)._id;
    const bookSlot = await AvailabilityService.bookAvailability(
      req.body.availabilityId
    );
    if (!bookSlot) {
      throw new Error("Slot not found");
    }
    const appointment = await AppointmentService.bookAppointment(
      req.body,
      userId,
      bookSlot?.date,
      bookSlot?.startTime
    );
    if (appointment) {
      res.send(createResponse(appointment, "Appointment Booked Successfully"));
    }
  }
);

/**
 * @api {patch} /appointment/:id Cancel an appointment
 * @apiName cancelAppointment
 * @apiGroup Appointment
 *
 * @apiParam {ObjectId} id The id of the appointment to be cancelled
 *
 * @apiSuccess (200) {Object} appointment The cancelled appointment
 */
export const cancelAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const appointment = await AppointmentService.cancelAppointment(id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    const availabilityId = appointment.availabilityId;

    const bookSlot = await AvailabilityService.cancelAvailability(
      availabilityId
    );

    res.send(createResponse(appointment, "Appointment Cancelled Successfully"));
  }
);

/**
 * Sends reminders for upcoming appointments.
 * @async
 * @function
 * @throws {Error} If an error occurs while sending reminder emails.
 */
export const upcomingReminder = async () => {
  const result = await AppointmentService.upcomingReminder();
  const response = await AppointmentService.sendAppointmentReminders(result);
  if (response) {
    console.log("Reminder sent successfully");
  } else {
    throw new Error("Error while sending email");
  }
};

export const rescheduleAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req.user as IUser)._id;
    const { appointmentId, availabilityId } = req.body;
    const appointment = await AppointmentService.getAppointmentById(
      appointmentId
    );
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    const reschedule = await AppointmentService.rescheduleAppointment(
      appointmentId
    );
    const slot = await AvailabilityService.cancelAvailability(
      appointment.availabilityId._id
    );
    const bookSlot = await AvailabilityService.bookAvailability(availabilityId);
    if (!bookSlot) {
      throw new Error("Slot not found");
    }
    const newappointment = await AppointmentService.bookAppointment(
      req.body,
      userId,
      bookSlot?.date,
      bookSlot?.startTime
    );
    if (appointment) {
      res.send(
        createResponse(newappointment, "Appointment Rescheduled Successfully")
      );
    }
  }
);

export const getUserAppointments = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req.user as IUser)._id;
    const appointments = await AppointmentService.getUserAppointments(userId);
    if (!appointments || appointments.length <= 0) {
      throw new Error("No Appointment for User");
    }
    res.send(
      createResponse(appointments, "Appointment Rescheduled Successfully")
    );
  }
);

import { AppDataSource } from "../common/services/postgres-database.service";
import ServiceSchema from "../service/service.schema";
import { IService } from "./service.dto";
import { Service } from "./service.entity";

const serviceRepository = AppDataSource.getRepository(Service);

/**
 * Creates a new service.
 * @param data - The service data to create the service with.
 * @returns The newly created service object.
 */
export const createService = async function (data: IService) {
  //mongodb
  // const result = await ServiceSchema.create({ ...data });
  // return result;
  //postgres
  const result = await serviceRepository.create(data);
  await serviceRepository.save(result);
  return result;
};

/**
 * Retrieves all services in the database.
 * @returns A promise that resolves to an array of service objects.
 */
export const getAllServices = async function () {
  //mongodb
  // const result = await ServiceSchema.find({}).lean();
  // return result;
  //postgres
  const result = await serviceRepository.find();
  return result;
};

/**
 * Retrieves a service by id.
 * @param id - The id of the service to retrieve.
 * @returns The service with the given id if found, null otherwise.
 */
export const getServiceById = async function (id: string) {
  //mongodb
  // const result = await ServiceSchema.findById(id).lean();
  // return result;

  //postgres
  const result = await serviceRepository.findOneBy({ _id: id });
  return result;
};

/**
 * Updates a service by id.
 * @param id - The service's id.
 * @param data - The data to update the service with.
 * @returns The updated service.
 */
export const updateService = async function (id: string, data: IService) {
  //mongo
  // const result = await ServiceSchema.findByIdAndUpdate(
  //   id,
  //   { ...data },
  //   { new: true }
  // );
  // return result;

  //postgres
  const result = await serviceRepository.update(id, data);
  return result;
};

/**
 * Deletes a service by id.
 * @param id - The id of the service to delete.
 * @returns The deleted service.
 */
export const deleteService = async function (id: string) {

  //mongo
  // const result = await ServiceSchema.findByIdAndDelete(id);
  // return result;

  const result = await serviceRepository.delete(id);
  return result
  
};

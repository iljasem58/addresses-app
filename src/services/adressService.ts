import axios from 'axios';
import { Address} from "../interfaces/address.ts";

//Base URL for the address-list API
const ADDRESS_BASE_URL = 'http://127.0.0.1:4001/';

//default configuration
const axiosInstance = axios.create({
    baseURL: ADDRESS_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const getAddresses = async (): Promise<Address[]> => {
    try {
        const response = await axiosInstance.get('/');
        return response.data.addresses;
    } catch (error) {
        console.error('Error fetching address-list:', error);
        throw new Error('Error fetching address-list');
    }
}

export const getAddressById = async (id: number): Promise<Address[]> => {
    try {
        const response = await axiosInstance.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching address by ID ${id}:`, error);
        throw new Error(`Error fetching addresses by ID ${id}`);
    }
}

export const deleteAddressById = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/${id}`);
        console.log(`Successfully deleted address by ID ${id}`);
    } catch (error) {
        console.error(`Error deleting address by ID ${id}:`, error);
        throw new Error(`Error deleting addresses by ID ${id}`);
    }
}
import { Address } from "../../interfaces/address.ts";
import {useState} from "react";

interface AddressDetailsProps {
    address: Address;
    deleteAddress: (id: number) => void;
    editAddress: (updatedAddress: Address) => void;
}

function AddressDetails({ address, deleteAddress, editAddress }: AddressDetailsProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedAddress, setEditedAddress] = useState<Address>(address);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = () => {
        editAddress(updatedAddress);
        setIsEditing(false);
    };

    return (
        <div className="card">
            <div className="card-body">
                <dl>
                    <dt>Country:</dt>
                    {isEditing ? (
                        <input
                            type="text"
                            name="country"
                            value={updatedAddress.country}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    ) : (
                        <dd>{address.country}</dd>
                    )}

                    <dt>Zip Code:</dt>
                    {isEditing ? (
                        <input
                            type="text"
                            name="zip"
                            value={updatedAddress.zip}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    ) : (
                        <dd>{address.zip}</dd>
                    )}
                </dl>
                <div className="d-flex justify-content-between">
                    {isEditing ? (
                        <>
                            <button className="btn btn-success" onClick={handleSave}>
                                Save Changes
                            </button>
                            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn btn-warning"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Address
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteAddress(address.id)}
                            >
                                Delete Address
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddressDetails;

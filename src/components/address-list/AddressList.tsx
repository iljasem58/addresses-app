import {useEffect, useState} from "react";
import {Address} from "../../interfaces/address.ts";
import {deleteAddressById, getAddresses} from "../../services/adressService.ts";
import AddressDetails from "../address-details/AddressDetails.tsx";
import SearchBar from "../search-bar/SearchBar.tsx";

function AddressList() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [expandedId, setExpandedId] = useState<number | null>();

    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        fetchAddresses();
    }, []);

    async function fetchAddresses() {
        try {
            const data = await getAddresses();
            setAddresses(data);
        } catch (error) {
            console.error("Error fetching address-list", error);
            setError("Error fetching address-list");
        } finally {
            setLoading(false);
        }
    }

    // Removing address from the current list
    async function deleteAddress(id: number) {
        try {
            await deleteAddressById(id);

            setAddresses(prevAddresses => prevAddresses.filter(address => address.id !== id));
        } catch (error) {
            console.error("Error deleting address", error);
        }
    }

    function handleToggle(address: Address) {
        if (expandedId === address.id) {
            setExpandedId(null);
        } else {
            setExpandedId(address.id);
        }
    }

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(e.target.value); // Update the search query state
    }

    // Filter addresses based on search query
    const filteredAddresses = addresses.filter((address) => {
        return (
            address.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            address.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
            address.zip.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleEditAddress = async (updatedAddress: Address) => {
        setAddresses((prevAddresses) =>
            prevAddresses.map((address) =>
                address.id === updatedAddress.id ? updatedAddress : address
            )
        );
    };

    if (loading) return (
        <>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading...</p>
        </>
    );

    if (error) return <p>{error}</p>;

    return (
        <>
            <h2>Addresses</h2>
            <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
            <ul className="list-group">
                {filteredAddresses.map((address: Address) => (
                    <div key={address.id}>
                        <li className={`list-group-item ${expandedId === address.id ? 'active' : ''}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleToggle(address)}
                        >
                            {address.address}
                        </li>

                        {expandedId === address.id && <AddressDetails address={address} deleteAddress={deleteAddress} editAddress={handleEditAddress}  />}
                    </div>
                ))}
            </ul>
        </>
    );
}

export default AddressList;
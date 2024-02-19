import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HomeSuperAdmin() {
    const [inventories, setInventories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: 0,
        price: 0,
    });
    const [showPopup, setShowPopup] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: null,
        name: '',
        description: '',
        quantity: 0,
        price: 0,
    });
    const [showEditPopup, setShowEditPopup] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const [deleteItemId, setDeleteItemId] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        // Mengambil data dari API Laravel
        axios.get('http://127.0.0.1:8000/api/inventory')
            .then(response => {
                console.log('API Response:', response.data.results);
                setInventories(response.data.results);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    // Input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Make a request to add data to the API
        axios
            .post('http://127.0.0.1:8000/api/inventory/addnew', formData)
            .then((response) => {
                console.log('Data added successfully:', response.data);
                // You can update the inventories state with the new data if needed
                setInventories([...inventories, response.data]);

                // Close the popup after successful submission
                closePopup();
            })
            .catch((error) => {
                console.error('Error adding data:', error);
            });
    };


    //Aksi Tombol Edit
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const openEditPopup = (inventory) => {
        setEditFormData({
            id: inventory.id,
            name: inventory.name,
            description: inventory.description,
            quantity: inventory.quantity,
            price: inventory.price,
        });
        setShowEditPopup(true);
    };

    const closeEditPopup = () => {
        setShowEditPopup(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        // Make a request to update data in the API
        axios
            .put(`http://127.0.0.1:8000/api/inventory/update/${editFormData.id}`, editFormData)
            .then((response) => {
                console.log('Data updated successfully:', response.data);
                // You can update the inventories state with the new data if needed
                const updatedInventories = inventories.map((inventory) =>
                    inventory.id === response.data.id ? response.data : inventory
                );
                setInventories(updatedInventories);

                // Close the edit popup after successful submission
                closeEditPopup();
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });
    };


    // handle sorting
    const handleSort = (field, order) => {
        setSortBy(field);
        setSortOrder(order);
    };


    // Sort inventories based on selected options
    const sortedInventories = inventories.slice().sort((a, b) => {
        if (sortBy === 'name') {
            return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === 'price') {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        } else {
            return 0;
        }
    });

    //delete
    const handleDelete = () => {
        if (deleteItemId) {

            axios
                .delete(`http://127.0.0.1:8000/api/inventory/delete/${deleteItemId}`)
                .then(() => {
                    console.log('Data deleted successfully.');

                    const updatedInventories = inventories.filter(inventory => inventory.id !== deleteItemId);
                    setInventories(updatedInventories);
                })
                .catch((error) => {
                    console.error('Error deleting data:', error);
                })
                .finally(() => {
                    setDeleteItemId(null);
                });
        }
    }

    //Logout
    const handleLogout = () =>{
        navigate('/login')
    }


    return (
        <div className="mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Inventory</h1>

            <h1 className='container text-center'>Hello SuperAdmin</h1>
            <div className='container px-20 flex justify-between mb-4 mt-2'>
                <button className='bg-blue-400 p-2 rounded-md text-white' onClick={openPopup}>+Tambah Data</button>
                {/* Popup */}
                <Transition show={showPopup} as={Fragment}>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                            </Transition.Child>

                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>

                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-8 py-6">
                                        <div className="text-center">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                                                Tambah Data
                                            </h3>
                                        </div>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                    Description
                                                </label>
                                                <input
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                                    Quantity
                                                </label>
                                                <input
                                                    type="number"
                                                    id="quantity"
                                                    name="quantity"
                                                    value={formData.quantity}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="flex justify-center gap-4 text-center mt-6 ">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"

                                                >
                                                    Tambah
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={closePopup}
                                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                >
                                                    Batal
                                                </button>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Transition>

                <div className='flex gap-4'>
                    {/* Searching */}
                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="p-2 border border-gray-300 rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* dropdown */}
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Sort By
                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleSort('name', 'asc')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Name (A-Z)
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleSort('name', 'desc')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Name (Z-A)
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleSort('price', 'asc')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Price (Low to High)
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleSort('price', 'desc')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Price (High to Low)
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogout}
                                                className={classNames(
                                                    active ? 'bg-red-600 text-white' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                LogOut
                                            </button>
                                        )}
                                    </Menu.Item>

                                    {/* <form method="POST" action="#">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => handleSort('price', 'desc')}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Price (High to Low)
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </form> */}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>


            <div className="container px-20 overflow-x-auto">
                <table className="w-full table-auto bg-white border border-gray-300 rounded-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b text-center">ID</th>
                            <th className="py-2 px-4 border-b text-center">Name</th>
                            <th className="py-2 px-4 border-b text-center">Description</th>
                            <th className="py-2 px-4 border-b text-center">Quantity</th>
                            <th className="py-2 px-4 border-b text-center">Price</th>
                            <th className="py-2 px-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedInventories
                            .filter((inventory) =>
                                inventory.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((inventory, index) => (

                                <tr key={inventory.id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                    <td className="py-2 px-4 border-b text-center">{inventory.name}</td>
                                    <td className="py-2 px-4 border-b text-center">{inventory.description}</td>
                                    <td className="py-2 px-4 border-b text-center">{inventory.quantity}</td>
                                    <td className="py-2 px-4 border-b text-center">${inventory.price}</td>
                                    <td className="py-2 px-4 border-b text-center">


                                        {/* Edit */}

                                        {/* Tombol Aksi */}
                                        <button className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-blue-600" onClick={() => openEditPopup(inventory)}>
                                            Edit
                                        </button>
                                        <button className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600" onClick={() => setDeleteItemId(inventory.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <Transition show={showEditPopup} as={Fragment}>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-8 py-6">
                                    <div className="text-center">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                                            Edit Data
                                        </h3>
                                    </div>
                                    <form onSubmit={handleEditSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={editFormData.name}
                                                onChange={handleEditInputChange}
                                                required
                                                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                id="description"
                                                name="description"
                                                value={editFormData.description}
                                                onChange={handleEditInputChange}
                                                required
                                                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                value={editFormData.quantity}
                                                onChange={handleEditInputChange}
                                                required
                                                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                value={editFormData.price}
                                                onChange={handleEditInputChange}
                                                required
                                                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="flex justify-center gap-4 text-center mt-6 ">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"

                                            >
                                                Simpan
                                            </button>

                                            <button
                                                type="button"
                                                onClick={closeEditPopup}
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                            >
                                                Batal
                                            </button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition>

            <Transition show={deleteItemId !== null} as={Fragment}>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-8 py-6">
                                    <div className="text-center">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                                            Delete Confirmation
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4">
                                            Are you sure you want to delete this item?
                                        </p>
                                    </div>
                                    <div className="flex justify-center gap-4 text-center mt-6">
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDeleteItemId(null)}
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition>
        </div>
    );
    }
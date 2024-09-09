import React, { useState, useEffect } from 'react';
import CreateMemberModal from '../Components/Modals/CreateMemberModal';
import UpdateMemberModal from '../Components/Modals/EditMemberModal';
import DeleteMemberModal from '../Components/Modals/DeleteMemberModal';
import { fetchMembers, updateMember,deleteMember } from '../Utils/apiMemberService';
import { Trash2,Pencil } from 'lucide-react';
const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 
  const [selectedMember, setSelectedMember] = useState(null);


  // Fetching Member Data
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await fetchMembers();
        setMembers(data);
      } catch (err) {
        setError('Failed to fetch members. Please try again later.');
        console.error('Error fetching members:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  // Message Data Time
  useEffect(() => {
    let timer;
    if (success) {
        timer = setTimeout(() => {
            setSuccess(null); 
        }, 2000);
    } else if (error) {
        timer = setTimeout(() => {
            setError(null);
        }, 2000);
    }
    return () => clearTimeout(timer);
}, [success, error]);

  //Create Member Functions
  const handleAddMember = async () => {
    setIsModalOpen(false);
    setLoading(true);
    try {
      const data = await fetchMembers();
      setMembers(data);
      setSuccess('Member added successfully!');
    } catch (err) {
      setError('Failed to refresh member list. Please try again.');
      console.error('Error refreshing members:', err);
    } finally {
      setLoading(false);
    }
  };

  //Update Member Function
  const handleUpdateMember = async(id, updatedData) => {
    setLoading(true);
    try {
        await updateMember(id, updatedData);
        const data = await fetchMembers();
        setMembers(data);
        setSuccess('Member updated successfully!');
    } catch (err) {
        setError('Failed to update member. Please try again.');
        console.error('Error updating member:', err);
    } finally {
        setLoading(false);
    }
  }


  // Remove Data
    const handleDeleteMember = async (id) => {
      setLoading(true);
      try {
          await deleteMember(id);
          const data = await fetchMembers();
          setMembers(data);
          setSuccess('Member deleted successfully!');
      } catch (err) {
          setError('Failed to delete member. Please try again.');
          console.error('Error deleting member:', err);
      } finally {
          setLoading(false);
      }
  };

  // Open Update Modal Window
    const openUpdateModal = (member) => {
      setSelectedMember(member);
      setIsUpdateModalOpen(true);
  };
  // Open Remove Modal Window
  const openDeleteModal = (memberId) => {
    setSelectedMember({ id: memberId });
    setIsDeleteModalOpen(true);
};
  return (
    <div className="p-5">
      <div className="bg-slate-100 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Members List</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Members
          </button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center p-4">Loading...</p>
          ) : error ? (
            <p className="text-center p-4 text-red-500">{error}</p>
          ) : success ? (
            <p className="text-center p-4 text-green-500">{success}</p>
          ) : members.length === 0 ? (
            <p className="text-center p-4">No members found. Add new members now.</p>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-200 text-gray-600 text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">PhoneNumber</th>
                  <th className="px-4 py-2">Roles</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-t">
                    <td className="px-4 py-2">{member.id}</td>
                    <td className="px-4 py-2">{member.name}</td>
                    <td className="px-4 py-2">{member.email}</td>
                    <td className="px-4 py-2">{member.address}</td>
                    <td className="px-4 py-2">{member.phoneNumber}</td>
                    <td className="px-4 py-2">{member.role}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => openUpdateModal(member)} className="text-blue-500 hover:underline"> <Pencil className='h-5 w-5' />Edit</button>
                      <button  onClick={() => openDeleteModal(member.id)} className="ml-2 text-red-500 hover:underline"> <Trash2 className='h-5 w-5' />Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <CreateMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddMember={handleAddMember}
        />

        <UpdateMemberModal
           isOpen={isUpdateModalOpen}
           onClose={() => setIsUpdateModalOpen(false)}
           onUpdate={handleUpdateMember}
           member={selectedMember}
        />

      <DeleteMemberModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleDeleteMember}
            memberId={selectedMember?.id}
      />
      </div>
    </div>
  );
};

export default Main;
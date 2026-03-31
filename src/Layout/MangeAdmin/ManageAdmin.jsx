import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosHook } from "../../Hooks/AxiosHook";
import Swal from "sweetalert2";

const ManageAdmin = () => {
  const axios = AxiosHook();

  const fetchUsers = async (email) => {
    if (!email) return [];
    const { data } = await axios.get(`/users/search?email=${email}`);
    return data;
  };

  const [query, setQuery] = useState("");

  const { data: users = [], refetch, isLoading, isError, error } = useQuery({
    queryKey: ["users", query],
    queryFn: () => fetchUsers(query),
    enabled: false,
  });

  const roleMutation = useMutation({
    mutationFn: ({ userId, role }) =>
      axios.patch(`/users/${userId}/role`, { role }),
    onSuccess: () => refetch(),
  });

  const handleSearch = async () => {
    if (!query) return;
    const result = await refetch();

    if (result.data.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No Users Found",
        text: `No users found for "${query}"`,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

 const handleRoleChange = (userId, newRole) => {
  const isPromoting = newRole === "admin";

  Swal.fire({
    title: isPromoting ? "Promote to Admin?" : "Demote to User?",
    text: isPromoting
      ? "This user will gain admin privileges."
      : "This user will lose admin privileges.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: isPromoting ? "#16a34a" : "#dc2626", // green / red
    cancelButtonColor: "#6b7280",
    confirmButtonText: isPromoting ? "Yes, Promote" : "Yes, Demote",
  }).then((result) => {
    if (result.isConfirmed) {
      roleMutation.mutate(
        { userId, role: newRole },
        {
          onSuccess: () => {
            refetch();

            // ✅ Success popup after action
            Swal.fire({
              icon: "success",
              title: isPromoting
                ? "User Promoted!"
                : "User Demoted!",
              text: isPromoting
                ? "The user is now an admin."
                : "The user is now a regular user.",
              timer: 2000,
              showConfirmButton: false,
            });
          },
        }
      );
    }
  });
};

  return (
    <div className="p-6 max-w-xl mx-auto text-black">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>

      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">{error.message}</p>}

      {users.length > 0 && (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Created At</th>
              <th className="border px-2 py-1">Role</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="border px-2 py-1">{user.role}</td>
                <td className="border px-2 py-1 flex gap-2">
                  <button
                    onClick={() =>
                      handleRoleChange(
                        user._id,
                        user.role === "admin" ? "user" : "admin"
                      )
                    }
                    className={`px-2 py-1 rounded text-white ${
                      user.role === "admin" ? "bg-red-500" : "bg-green-500"
                    }`}
                    disabled={roleMutation.isLoading}
                  >
                    {user.role === "admin"
                      ? "Demote to User"
                      : "Promote to Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageAdmin;
import { useEffect, useState } from "react";
import api from "../api/axios";

function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await api.get(
        "/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const updateRole = async (
    userId: string,
    role: string
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await api.patch(
        `/users/${userId}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">
        User Management
      </h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">

          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b"
              >
                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">

                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateRole(
                        user.id,
                        e.target.value
                      )
                    }
                    className="border rounded px-3 py-2"
                  >
                    <option value="ADMIN">
                      ADMIN
                    </option>

                    <option value="ENGINEER">
                      ENGINEER
                    </option>

                    <option value="RESEARCHER">
                      RESEARCHER
                    </option>
                  </select>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default UsersPage;
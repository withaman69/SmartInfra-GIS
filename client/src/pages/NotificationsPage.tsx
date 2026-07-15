import { useEffect, useState } from "react";
import api from "../api/axios";

function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res =
        await api.get("/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      setNotifications(
        res.data.notifications
      );
    } catch (error) {
      console.error(error);
    }
  };

  const markRead = async (
    id: string
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await api.patch(
        `/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        Notifications
      </h1>

      <div className="bg-white rounded-xl shadow-md">
        {notifications.length === 0 ? (
          <p className="p-6 text-slate-500">
            No notifications found
          </p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 border-b ${
                !n.isRead
                  ? "bg-blue-50"
                  : ""
              }`}
            >
              <h3 className="font-bold">
                {n.title}
              </h3>

              <p>{n.message}</p>

              <p className="text-sm text-slate-500 mt-1">
                {new Date(
                  n.createdAt
                ).toLocaleString()}
              </p>

              {!n.isRead && (
                <button
                  onClick={() =>
                    markRead(n.id)
                  }
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Mark Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
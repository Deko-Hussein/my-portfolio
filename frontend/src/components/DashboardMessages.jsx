import { useEffect, useState } from "react";
import API from "../services/api";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function DashboardMessages() {
  const [messages, setMessages] = useState([]);
  const [notice, setNotice] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await API.get("/messages");
      setMessages(response.data.data || []);
    } catch (error) {
      console.error(error);
      setNotice("Failed to load messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      await API.put(`/messages/${id}/read`);
      setNotice("Message marked as read");
      fetchMessages();
    } catch (error) {
      console.error(error);
      setNotice(error.response?.data?.message || "Failed to update message");
    }
  };

  const deleteMessage = async (id) => {
    try {
      await API.delete(`/messages/${id}`);
      setNotice("Message deleted successfully");
      fetchMessages();
    } catch (error) {
      console.error(error);
      setNotice(error.response?.data?.message || "Failed to delete message");
    }
  };

  const unreadCount = messages.filter((item) => !item.isRead).length;

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
          Messages
        </p>
        <h1 className="text-3xl font-semibold text-slate-50">Inbox management</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-400">
          Review incoming messages, mark important conversations as read, and
          keep your contact inbox clean.
        </p>
      </div>

      {notice && (
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/8 px-4 py-3 text-sm text-cyan-100">
          {notice}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        <article className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm text-slate-400">Total messages</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-50">{messages.length}</h2>
        </article>
        <article className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm text-slate-400">Unread</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-50">{unreadCount}</h2>
        </article>
        <article className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm text-slate-400">Read</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-50">{messages.length - unreadCount}</h2>
        </article>
      </div>

      <section className="space-y-5">
        {messages.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center text-slate-400">
            No messages yet.
          </div>
        ) : (
          messages.map((item) => (
            <article
              key={item._id}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold text-slate-100">{item.name}</h2>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.isRead
                          ? "bg-white/[0.06] text-slate-300"
                          : "bg-cyan-400/12 text-cyan-200"
                      }`}
                    >
                      {item.isRead ? "Read" : "Unread"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{item.email}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                    {item.subject || "General inquiry"} • {formatDate(item.createdAt)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {!item.isRead && (
                    <button
                      onClick={() => markAsRead(item._id)}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(item._id)}
                    className="rounded-xl bg-rose-500/14 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-300">{item.message}</p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export default DashboardMessages;

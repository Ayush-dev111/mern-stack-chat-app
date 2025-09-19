import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div role="tablist" className="tabs tabs-boxed bg-transparent p-2 m-2 mx-auto">
      <button
        onClick={() => setActiveTab("chats")}
        role="tab"
        className={`tab w-35 ${
          activeTab === "chats" ? "bg-cyan-500/20 text-cyan-600" : "text-slate-400"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        role="tab"
        className={`tab w-35 ${
          activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-600" : "text-slate-400"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;
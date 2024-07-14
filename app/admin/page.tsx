import AdminOptionsCards from "@/components/admin/AdminOptionsCards";

const AdminPage = () => {
  return (
    <div>
      <h1
        className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed px-16 pt-16"
        dir="rtl"
      >
        שלום אדמין,
      </h1>
      <AdminOptionsCards />
    </div>
  );
};

export default AdminPage;

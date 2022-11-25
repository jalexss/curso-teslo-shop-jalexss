import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { AdminLayout } from "../../components/layouts";

const OrdersPage = () => {
  return (
    <AdminLayout
      title={"Ordenes"}
      subTitle={"Mantenimiento de ordenes"}
      icon={<ConfirmationNumberOutlined />}
    ></AdminLayout>
  );
};

export default OrdersPage;

import { zodResolver } from "@hookform/resolvers/zod";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DataTable from "../Data";
import Editor from "../Editors";

const schema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  content: z.string().min(10, "Nội dung ít nhất 10 ký tự"),
  receivers: z.string().min(1, "Danh sách người nhận là bắt buộc"),
});

type FormData = z.infer<typeof schema>;
const EmailSender = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      receivers: "",
    },
  });
  const onSubmit = (data: FormData) => {
    const receivers = JSON.parse(data.receivers);
    const hasEmptyOrNull = receivers.some((row: any) =>
      Object.values(row).some((value) => value === null || value === "")
    );
    if (hasEmptyOrNull) {
      notification.error({
        message: "Thiếu dữ liệu",
        description:
          "Vui lòng kiểm tra lại danh sách người nhận, không được để trống",
      });
      return;
    }
    notification.success({
      message: "Gửi email thành công",
      description: "Bạn đã gửi email thành công",
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-gray-900">
          Hệ thống gửi Email tự động
        </h1>
        <p className="text-gray-500 mt-1">
          Tạo và gửi email hàng loạt một cách dễ dàng
        </p>

        {/* Tabs */}
        <div className="flex space-x-4 mt-6">
          <button className="px-4 py-2 bg-white border rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center">
            📧 Soạn Email
          </button>
          <button className="px-4 py-2 bg-white border rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center">
            ✈️ Gửi Email
          </button>
        </div>

        {/* Grid main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Thông tin người gửi */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Thông tin người gửi
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Cấu hình thông tin email gửi đi
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên người gửi
              </label>
              <input
                type="text"
                placeholder="Nhập tên người gửi"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email người gửi
              </label>
              <input
                type="email"
                placeholder="your-email@example.com"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Thống kê */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Thống kê
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Tổng quan về chiến dịch email
            </p>

            <div className="flex space-x-4">
              <div className="bg-blue-100 text-blue-700 text-center p-4 rounded-md w-1/2">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm">Tổng người nhận</div>
              </div>
              <div className="bg-green-100 text-green-700 text-center p-4 rounded-md w-1/2">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm">Đã gửi thành công</div>
              </div>
            </div>
          </div>
        </div>

        {/* Nội dung email */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Nội dung Email
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Soạn nội dung email với trình soạn thảo rich text
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tiêu đề email
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="Nhập tiêu đề email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nội dung email
            </label>
            <Editor control={control} name="content" />
          </div>
        </div>
        {/* Data */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            👤Danh sách người nhận
          </h2>
          <DataTable control={control} name="receivers" />
        </div>
      </div>
    </form>
  );
};

export default EmailSender;

import { HotTable } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.css";
import "handsontable/styles/ht-theme-main.css";
import { useRef } from "react";
import { useController } from "react-hook-form";

registerAllModules();
const initialData = [
  ["Tuan", "nhoklilom2.0@gmail.com", "Male", "20"],
  ["Hoa", "hoanam123@gmail.com", "Female", "22"],
  ["Nam", "namnguyen456@gmail.com", "Male", "21"],
];
const DataTable = ({ control, name }: any) => {
  const hotRef = useRef<any>(null);
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "", // nên đặt default để tránh warning
  });

  return (
    <div>
      <HotTable
        ref={hotRef}
        data={initialData}
        colHeaders={["A", "B", "C", "D"]} // Tiêu đề cột bạn định nghĩa ở đây
        rowHeaders={true}
        height={"auto"}
        width={"auto"}
        stretchH="all"
        manualRowResize={true}
        manualColumnResize={true}
        contextMenu={true}
        allowInsertRow={true}
        allowInsertColumn={true}
        licenseKey="non-commercial-and-evaluation"
        afterChange={(changes, source) => {
          if (source === "loadData") return; // bỏ qua lần đầu khởi tạo
          const hot = hotRef.current.hotInstance;
          const currentData = hot.getData();
          const colHeaders = hot.getColHeader();

          const rowObjects = currentData.map((row: any[]) => {
            const rowObj: any = {};
            colHeaders.forEach((header: string, index: number) => {
              rowObj[header] = row[index];
            });
            return rowObj;
          });
          onChange(JSON.stringify(rowObjects));
        }}
      />
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
};

export default DataTable;

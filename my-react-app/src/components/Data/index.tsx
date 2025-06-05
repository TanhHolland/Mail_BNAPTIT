import { HotTable } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.css";
import "handsontable/styles/ht-theme-main.css";
import { useRef } from "react";

registerAllModules();

const DataTable: React.FC = () => {
  const hotRef = useRef<any>(null);

  const handleGetDataWithHeaders = () => {
    const hot = hotRef.current.hotInstance;
    const data = hot.getData(); // Lấy toàn bộ data
    const colHeaders = hot.getColHeader(); // Lấy tiêu đề cột, ví dụ: ["A", "B", "C", "D"]

    const rowObjects = data.map((row: any[]) => {
      const rowObj: any = {};
      colHeaders.forEach((header: string, index: number) => {
        rowObj[header] = row[index];
      });
      return rowObj;
    });

    console.log("Danh sách hàng dạng object:", rowObjects);
  };

  return (
    <div>
      <button onClick={handleGetDataWithHeaders} style={{ marginBottom: 10 }}>
        Lấy từng hàng dạng object
      </button>

      <HotTable
        ref={hotRef}
        data={[
          ["Tuan", "T031", "Male", "20"],
          ["Hoa", "H120", "Female", "22"],
          ["Nam", "N543", "Male", "21"],
        ]}
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
      />
    </div>
  );
};

export default DataTable;

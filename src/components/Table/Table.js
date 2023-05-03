import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "../../../node_modules/react-data-table-component-extensions/dist/index.css";

function ReactTableComponentList({ columns, data }) {
  const tableData = {
    columns,
    data,
  };

  return (
    <div className='table-shadow-wrapper'>
      <DataTableExtensions {...tableData}>
        <DataTable noHeader defaultSortField='id' defaultSortAsc={false} pagination highlightOnHover />
      </DataTableExtensions>
    </div>
  );
}

export default ReactTableComponentList;

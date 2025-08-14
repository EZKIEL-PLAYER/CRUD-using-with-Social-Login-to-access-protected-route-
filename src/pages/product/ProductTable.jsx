import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../features/product/productSlice2";
import { Link } from "react-router";
import DataTable from "react-data-table-component";
import { FaTrashAlt } from "react-icons/fa";

export default function Products() {
  const { data, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
    }
  };

  const columns = [
    {
      name: "Thumbnail",
      selector: (row) =>
        row?.thumbnail ? (
          <img
            src={row.thumbnail}
            alt={row.name}
            className="w-12 h-12 object-cover rounded"
          />
        ) : (
          "No Image"
        ),
    },
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row?.category?.name,
    },
    {
      name: "Price",
      selector: (row) => `${row?.priceOut} $`,
    },
    {
      name: "Stock",
      selector: (row) => row?.stockQuantity,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className=" flex gap-2">
          <Link
            to={`/edit/${row.uuid}`}
            className=" px-3 flex items-center justify-center text-white rounded-md bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300"
          >
            Edit
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelete(row?.uuid);
            }}
            className=" flex items-center justify-center text-white rounded-md  transition-colors duration-300"
          >
            <FaTrashAlt className="fill-red-500 h-7" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Hide horizontal scrollbar track for DataTable */}
      <style>
        {`
          .react-data-table-component__table-wrapper::-webkit-scrollbar {
            height: 0 !important;
            background: transparent !important;
          }
          .react-data-table-component__table-wrapper {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
        `}
      </style>

      <main className="max-w-screen-xl mx-auto px-10">
        {/* Header: Title and Add Product button */}
        <div className="flex items-center justify-between my-5">
          <h2 className="text-2xl font-semibold text-gray-700">All Products</h2>
          <Link
            to={`/add-product`}
            className="h-10 px-4 flex items-center justify-center text-white rounded-md bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300"
          >
            Add Product
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={data?.content}
          pagination
          progressPending={isLoading}
        />
      </main>
    </>
  );
}

import { useGetProductsQuery } from "./features/product/productSlice2";
import CardProduct from "./components/card/card-product";
import SkeletonCardProduct from "./components/card/skeleton-card-product";

function App() {
  const { data, isLoading } = useGetProductsQuery();
  const array = Array(8).fill(0); // skeleton placeholders

  console.log("data from RTK Query", data);

  return (
    <main className="max-w-screen-xl mx-auto px-4 md:px-8 mt-20 mb-20">
      {/* Page Title */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Welcome
        </h1>
        <p className="mt-2 text-gray-500 max-w-lg mx-auto">
          Discover our latest collection of high-quality products made with care
          and style.
        </p>
      </header>

      {/* Product Grid */}
      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading &&
          array.map((_, index) => <SkeletonCardProduct key={index} />)}

        {!isLoading &&
          data?.content.map((p, index) => (
            <CardProduct
              key={index}
              thumbnail={p.thumbnail}
              title={p.name}
              id={p.uuid}
            />
          ))}
      </section>
    </main>
  );
}

export default App;

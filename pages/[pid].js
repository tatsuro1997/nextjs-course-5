import path from "path";
import fs from "fs/promises";

function ProductDetailPage(props) {
  const { leaodedProduct } = props;

  // if (!leaodedProduct) {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <h1>{leaodedProduct.title}</h1>
      <p>{leaodedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      leaodedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
}

export default ProductDetailPage;

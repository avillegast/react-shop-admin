import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Chart } from '@common/Chart';

const perPage = 5;
const PRODUCT_LIMIT = perPage;
const PRODUCT_OFFSET = 0;

function Dashboard() {
  const totalCount = useFetch(endPoints.products.getProducts1, 0).data.length;

  const totalPages = Math.ceil(totalCount / perPage);

  const { data, page, loading, setPage } = useFetch(endPoints.products.getProducts1, PRODUCT_LIMIT);
  const products = data;
  const categoryNames = products?.map((product) => product.category);
  const categoryCount = categoryNames.map((category) => category.name);
  console.log('===========categoryName=========================');
  console.log(categoryNames);
  console.log('===========categoryCount=========================');
  console.log(categoryCount);
  const countOccurrences = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
  const datachart = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurrences(categoryCount),
        borderwidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50af95', '#f3ba2f', '#2a71d0'],
      },
    ],
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Chart className="mb-8 mt-2" chartData={datachart} />
        </div>
      )}
    </>
  );
}

export default Dashboard;

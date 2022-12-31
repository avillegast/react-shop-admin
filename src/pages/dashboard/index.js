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
  const categoryNames = products?.map((product)=> product.category);
  const categoryCount = categoryNames.map((category)=> category.name);
  console.log('===========categoryName=========================');
  console.log(categoryNames);
  console.log('===========categoryCount=========================');
  console.log(categoryCount);
  const countOccurrences= (arr) => arr.reduce((prev,curr)=>((prev[curr]= ++prev[curr] || 1),prev),{});
  const datachart = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurrences(categoryCount),
        borderwidth: 2,
        backgroundColor: ['#ffbb11','#c0c0c0','#50af95','#f3ba2f','#2a71d0']
      }
    ]
  }

  return (
    <>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Chart className='mb-8 mt-2' chartData={datachart}/>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Id
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products?.map((product) => (
                      <tr key={`Product-item-${product.id}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={product.images[0]} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.title}</div>
                              {/* <div className="text-sm text-gray-500">{product.description}</div> */}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.category.name}</div>
                          {/* <div className="text-sm text-gray-500">{product.category.image}</div> */}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${product.price}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="/login" className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </td>
                        <td>
                          <a href="/login" className="text-indigo-600 hover:text-indigo-900">
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Previous
                    </a>
                    <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Next
                    </a>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{page}</span> to <span className="font-medium">{page + 4}</span> of <span className="font-medium">{totalPages}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Link
                          href="/dashboard"
                          onClick={() => {
                            if (page > 1) {
                              setPage(page - 1);
                            }
                          }}
                          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                        <Link
                          href="/dashboard"
                          aria-current="page"
                          className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                        >
                          {page}
                        </Link>
                        {Array.from({ length: 4 }).map((_, index) => (
                          <Link
                            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            key={index}
                            href="/dashboard"
                            onClick={() => setPage(page + index + 1)}
                          >
                            {page + index + 1}
                          </Link>
                        ))}
                        <Link
                          href="/dashboard"
                          onClick={() => {
                            if (page < totalPages) {
                              setPage(page + 1);
                            }
                          }}
                          className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;

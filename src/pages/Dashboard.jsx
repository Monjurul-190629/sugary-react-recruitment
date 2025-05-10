import { useSelector } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMaterials } from '../features/metarials/fetchMaterials';
import { useEffect, useRef, useCallback } from 'react';
import { Tag, DollarSign, ShoppingCart } from 'lucide-react';

const IMAGE_BASE_URL = 'https://d1wh1xji6f82aw.cloudfront.net/';

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['materials'],
    queryFn: ({ pageParam = 0 }) => fetchMaterials({ pageParam, token }),
    getNextPageParam: (lastPage) =>
      lastPage.RemainingCount > 0 ? lastPage.nextSkip : undefined,
    enabled: !!token,
  });

  const loadMoreRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-700 via-purple-800 to-indigo-900 px-6 py-12">
      <h3 className="text-4xl font-extrabold text-center text-white mb-12 drop-shadow-md tracking-tight">
        Explore Our <span className="text-yellow-300">Premium Materials</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {data?.pages.map((page) =>
          page.Materials.map((item) => (
            <div
              key={item.Id}
              className="group relative p-6 bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl hover:shadow-yellow-400/40 transform hover:scale-[1.02] transition-all duration-500 overflow-hidden"
            >
              {/* Decorative Border */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-yellow-400/50 transition duration-500 pointer-events-none" />

              {/* Image */}
              <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:scale-[1.02] group-hover:rotate-[0.5deg] transition-all duration-500">
                <img
                  src={`${IMAGE_BASE_URL}${item.CoverPhoto}`}
                  alt={item.Title}
                  className="h-full w-full object-cover rounded-2xl"
                />
                <span className="absolute top-3 right-3 bg-yellow-300/90 text-xs text-black font-bold px-3 py-1 rounded-full shadow-md">
                  #{item.Id}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-xl font-semibold text-white mb-2 line-clamp-1">
                {item.Title}
              </h4>

              {/* Brand */}
              <div className="flex items-center gap-2 text-sm text-purple-200 mb-1">
                <Tag className="w-4 h-4 text-yellow-300" />
                <span>{item.BrandName}</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 text-sm text-purple-200 mb-1">
                <DollarSign className="w-4 h-4 text-green-300" />
                <span>{item.SalesPrice} TK</span>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-auto pt-5">
                <p className="text-yellow-300 font-bold text-lg drop-shadow">
                  ${item.SalesPriceInUsd.toFixed(2)}
                </p>
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-5 py-2 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-300">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-semibold">Add</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Infinite Scroll Loader */}
      <div ref={loadMoreRef} className="h-12 mt-14 flex justify-center items-center">
        {isFetchingNextPage && (
          <span className="text-white animate-pulse font-medium text-lg">
            Loading more materials...
          </span>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

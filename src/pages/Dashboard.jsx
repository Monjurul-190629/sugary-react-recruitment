import { useSelector } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMaterials } from '../features/metarials/fetchMaterials';
import { useEffect, useRef, useCallback } from 'react';
import { Tag, DollarSign, ShoppingCart } from 'lucide-react';

const IMAGE_BASE_URL = 'https://d1wh1xji6f82aw.cloudfront.net/';

const Dashboard = () => {
    const { token} = useSelector((state) => state.auth);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,

    } = useInfiniteQuery({
        queryKey: ['materials'],
        queryFn: ({ pageParam = 0 }) =>
            fetchMaterials({ pageParam, token }),
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
        <div className="p-6 ">
            

            <h3 className="text-2xl font-semibold mb-4 text-center pb-8 text-indigo-700 underline">Materials</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.pages.map((page) =>
                    page.Materials.map((item) => (

                        // Inside your map:
                        <div
                            key={item.Id}
                            className="relative bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-5 flex flex-col border border-blue-300 group"
                        >
                            {/* Floating Image Container */}
                            <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-5 transform transition-transform duration-300 group-hover:scale-[1.02] shadow-md">
                                <img
                                    src={`${IMAGE_BASE_URL}${item.CoverPhoto}`}
                                    alt={item.Title}
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                                <span className="absolute top-3 right-3 bg-white text-xs text-blue-700 font-semibold px-3 py-1 rounded-full shadow">
                                    #{item.Id}
                                </span>
                            </div>

                            {/* Title */}
                            <h4 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">{item.Title}</h4>

                            {/* Brand */}
                            <div className="flex items-center gap-2 text-gray-700 text-sm mb-1">
                                <Tag className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">{item.BrandName}</span>
                            </div>

                            {/* Price in TK */}
                            <div className="flex items-center gap-2 text-gray-700 text-sm mb-1">
                                <DollarSign className="w-4 h-4 text-green-500" />
                                <span className="font-medium">{item.SalesPrice} TK</span>
                            </div>

                            {/* USD Price and Button */}
                            <div className="flex justify-between items-center mt-auto pt-4">
                                <p className="text-blue-700 font-bold text-lg tracking-wide">
                                    ${item.SalesPriceInUsd.toFixed(2)}
                                </p>
                                <button className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white px-4 py-1.5 rounded-xl hover:from-blue-800 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                                    <ShoppingCart className="w-4 h-4" />
                                    <span className="font-medium">Add</span>
                                </button>
                            </div>
                        </div>

                    ))
                )}
            </div>

            <div ref={loadMoreRef} className="h-10 mt-10 flex justify-center items-center">
                {isFetchingNextPage && <span>Loading more...</span>}
            </div>
        </div>
    );
};

export default Dashboard;

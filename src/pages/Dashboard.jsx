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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {data?.pages.map((page) =>
                    page.Materials.map((item) => (

                        // Inside your map:
                        <div
                            key={item.Id}
                            className="relative bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl hover:shadow-blue-400/40 transition-all duration-500 p-6 flex flex-col group overflow-hidden hover:scale-[1.02]"
                        >
                            {/* Glowing Border Animation */}
                            <div className="absolute inset-0 rounded-3xl pointer-events-none border border-transparent group-hover:border-blue-500/50 transition-all duration-500" />

                            {/* Image with 3D Hover */}
                            <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-4 transform transition-transform duration-500 group-hover:rotate-[0.5deg] group-hover:scale-[1.04] shadow-lg shadow-blue-200/30">
                                <img
                                    src={`${IMAGE_BASE_URL}${item.CoverPhoto}`}
                                    alt={item.Title}
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                                <span className="absolute top-3 right-3 bg-white/80 text-xs text-blue-800 font-semibold px-3 py-1 rounded-full shadow-md">
                                    #{item.Id}
                                </span>
                            </div>

                            {/* Title */}
                            <h4 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 tracking-tight ">{item.Title}</h4>

                            {/* Brand */}
                            <div className="flex items-center gap-2 text-gray-700 text-sm mb-1">
                                <Tag className="w-4 h-4 text-blue-400" />
                                <span className="font-medium">{item.BrandName}</span>
                            </div>

                            {/* Price in TK */}
                            <div className="flex items-center gap-2 text-gray-200 text-sm mb-1">
                                <DollarSign className="w-4 h-4 text-green-400" />
                                <span className="font-medium text-gray-700">{item.SalesPrice} TK</span>
                            </div>

                            {/* Bottom: USD Price & Add Button */}
                            <div className="flex justify-between items-center mt-auto pt-5">
                                <p className="text-blue-700 font-bold text-lg drop-shadow-sm">
                                    ${item.SalesPriceInUsd.toFixed(2)}
                                </p>
                                <button className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white px-5 py-2 rounded-xl shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    <span className="font-semibold">Add</span>
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

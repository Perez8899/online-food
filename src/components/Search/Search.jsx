import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import SearchDishCard from './SearchDishCard';
import PopularCuisines from './PopularCuisines';
import { useDispatch, useSelector } from 'react-redux';
import { searchMenuItem } from '../State/Menu/Action';
import { topMeels } from '../Home/topMeels';

const Search = () => {
    const dispatch = useDispatch();
    const { auth, menu } = useSelector((store) => store);
    const jwt = localStorage.getItem("jwt");

    const handleSearchMenu = (keyword) => {
        dispatch(searchMenuItem({ keyword, jwt: auth.jwt || jwt }));
    };

    return (
        <div className="px-5 lg:px-[18vw]">
            <div className="relative py-5">
                <SearchIcon className="absolute top-[2rem] left-2" />
                <input
                    onChange={(e) => handleSearchMenu(e.target.value)}
                    className="p-2 py-3 pl-12 w-full bg-[#242B2E] rounded-sm outline-none"
                    type="text"
                    placeholder="buscar comida..."
                />
            </div>
            <div>
                <h1 className="py-5 text-2xl font-semibold">Comidas Populares</h1>
                <div className="flex flex-wrap ">
                    {topMeels.slice(0, 9).map((item) => (
                        <PopularCuisines image={item.image} title={item.title} />
                    ))}
                </div>
            </div>
            <div className=" mt-7">
                {menu.search.map((item) => (
                    <SearchDishCard item={item} />
                ))}
            </div>
        </div>
    )
}

export default Search

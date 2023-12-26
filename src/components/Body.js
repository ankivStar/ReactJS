import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer.js";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
 
const Body = () => {

  // local state variable - Super powerful variable
  const [listOfReastaurant, setlistOfRestaurant] = useState([])
  const [searchText, setSearchText] = useState("")
  const [listOfFilteredRestaurant, setListOfFilteredRestaurant] = useState([]);


  useEffect(()=>{
    fetchData()
  }, [])

  const fetchData = async  () =>{
    try{
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json()

      async function checkJsonData(jsonData){
        for(let i = 0; i < jsonData?.data?.cards?.length; i++){
          let checkData = jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

          if(checkData !== undefined){
            return checkData;
          }
        }
      } 

      const allRestaurant = await checkJsonData(json);
      setlistOfRestaurant(allRestaurant)
      setListOfFilteredRestaurant(allRestaurant)
    } catch(error) {
      console.log(error);
    }
  };

  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false) return (
    <h1>
      Looks like you are offline !! Please check your internet connection!
    </h1>
  )

  return listOfReastaurant.length === 0?
  (
    <Shimmer/>
  ):
  (
    <div className="pl-32 pr-32">
      <div className="filter flex ml-[42px] mr-[42px]">
        <div className="search m-4 p-4">
          <input type="text" className="border border-solid border-black w-[100px]" value={searchText} onChange={(e)=>{
            setSearchText(e.target.value)
          }}/>
          <button className="bg-green-100 m-1 rounded-lg" onClick={()=>{
            // filter the restaurnt cards and update the UI
            const filteredRestaurant = listOfReastaurant.filter((res)=> res.info.name.toLowerCase().includes(searchText.toLowerCase()))  

            setListOfFilteredRestaurant(filteredRestaurant)
          }}>Search</button> 
        </div>

        <div className=" search m-0 p-0 flex items-center">
          <button className="bg-gray-100 rounded-lg cursor-pointer" onClick={()=>{
          // filter logic here
          const filteredRestaurant = listOfReastaurant.filter((res) => res.info.avgRating > 4);
          setListOfFilteredRestaurant(filteredRestaurant);
          }}
          >
          Top Rated Restaurant 
          </button>
        </div>
        
      </div>  
      <div className="flex flex-wrap justify-center">
        {
          listOfFilteredRestaurant.map((restaurant) => ( 
          <Link
          key={restaurant?.info?.id}
          to={"/restaurant/"+restaurant?.info?.id}>
          <RestaurantCard  resName = {restaurant}/>
          </Link>
        ))} 
      </div>
    </div>
  )
}
export default Body;
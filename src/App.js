import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  getAllPeople,
  getAllPlanets,
  getAllSpecies,
  setReceivedAll,
} from "./store";
import { useEffect } from "react";

const App = () => {
  const { planets, people, species, receivedAll } = useSelector(
    (state) => state.main
  );
  const dispatch = useDispatch();

  // const getAllPlanetsData = async () => {
  //   const species = await axios.get("https://swapi.dev/api/species");
  //   let updateSpecies = species.data.results.filter((specie) => {
  //     if (specie.classification == "reptile") {
  //       return specie;
  //     }
  //   });
  //   console.log(updateSpecies);
  // };

  useEffect(() => {
    if (!receivedAll) {
      Promise.all([
        dispatch(getAllPlanets()),
        dispatch(getAllPeople()),
        dispatch(getAllSpecies()),
      ]).then(([planets, people, species]) => {
        dispatch(setReceivedAll(true));
        
        // let array = [...planets.payload, ...people.payload, ...species.payload];
        let filteredArray = species.payload.ilter((item) => {
          if(item.classification == "reptile"){
            return item;
          }
        });
        console.log(planets.payload);
        console.log(people.payload);
        console.log(species.payload);
      });
    } else {
      // console.log(species);
    }
  }, [receivedAll]);

  return (
    <div className="container m-auto mt-10">
      <div className="grid grid-cols-3 gap-4">
        {planets &&
          planets.map((item, index) => (
            <div
              className="rounded overflow-hidden shadow-xl border"
              key={index}
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #photography
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #travel
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #winter
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;

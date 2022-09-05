import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { memo } from "react";
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

  useEffect(() => {
    if (!receivedAll) {
      Promise.all([
        dispatch(getAllPlanets()),
        dispatch(getAllPeople()),
        dispatch(getAllSpecies()),
      ]).then(([species]) => {
        dispatch(setReceivedAll(true));
        
        // let array = [...planets.payload, ...people.payload, ...species.payload];
        let filteredArray = species.payload.filter((item) => {
          if(item.classification == "reptile"){
            return item;
          }
        });
        console.log(filteredArray);
      });
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
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(App);
